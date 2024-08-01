import { useEffect, useState } from 'react';
import Head from 'next/head';
import AdminStyle from '../styles/pages/admin.module.scss';

interface Report {
  id: string;
  reason: string;
  postId: string;
  commentId?: string; // Optional for comments
  userId: string;
  date: string;
  type: 'post' | 'comment'; // Type of report
}

interface Post {
  id: string;
  title: string;
  content: string;
  // Add other fields from your `post` table as needed
}

interface Comment {
  id: string;
  content: string;
  // Add other fields from your `comment` table as needed
}

export default function Admin() {
  const [reports, setReports] = useState<Report[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchId, setSearchId] = useState<string>('');
  const [searchType, setSearchType] = useState<'post' | 'comment'>('post'); // Type of item being searched
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState<Comment | null>(null); // State for comments
  const [postError, setPostError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('/api/fetchReports');
        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }
        const data = await response.json();
        setReports(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchReports();
  }, []);

  const handleSearch = async () => {
    if (!searchId) return;

    try {
      const endpoint = searchType === 'post' ? `/api/post/${searchId}` : `/api/comment/${searchId}`;
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`${searchType === 'post' ? 'Post' : 'Comment'} not found`);
      }
      const data = await response.json();
      searchType === 'post' ? setPost(data) : setComment(data);
      setPostError(null);
    } catch (err) {
      if (err instanceof Error) {
        setPostError(err.message);
      } else {
        setPostError('An unknown error occurred');
      }
      setPost(null);
      setComment(null);
    }
  };

  const deleteItem = async () => {
    const endpoint = searchType === 'post' ? `/api/post/${post?.id}` : `/api/comment/${comment?.id}`;
    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      setPost(null);
      setComment(null);
      setSearchId('');
      setError(null);
      alert(`${searchType === 'post' ? 'Post' : 'Comment'} deleted successfully`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      console.log('error deleting item:', err);
    }
  };

  const renderItemTable = (item: Post | Comment) => {
    return (
      <table className={AdminStyle.table}>
        <tbody>
          {Object.entries(item).map(([key, value]) => (
            <tr key={key}>
              <td className={AdminStyle.tableKey}>{key}</td>
              <td className={AdminStyle.tableValue}>{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <main>
        <div className={AdminStyle.parent}>
          <div className={AdminStyle.textSection}>
            <h1 className={AdminStyle.h1}>Welcome back Admin!</h1>
            <p className={AdminStyle.p}>Let's keep our community friendly</p>
          </div>
          
          <div className={AdminStyle.reportsSection}>
            {error && <p className={AdminStyle.error}>{error}</p>}
            <table className={AdminStyle.reportTable}>
              <thead>
                <tr>
                  <th className={AdminStyle.th}>New reports with PostId:</th>
                  <th className={AdminStyle.th}>Reason:</th>
                  <th className={AdminStyle.th}>CommentId:</th> {/* Optional column */}
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td className={AdminStyle.td}>{report.postId}</td>
                    <td className={AdminStyle.td}>{report.reason}</td>
                    <td className={AdminStyle.td}>{report.commentId || 'N/A'}</td> {/* Optional field */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={AdminStyle.textSection2}>
            <p className={AdminStyle.p2}>Search for the PostId or CommentId: </p>
            <select value={searchType} onChange={(e) => setSearchType(e.target.value as 'post' | 'comment')}>
              <option value="post">Post</option>
              <option value="comment">Comment</option>
            </select>
          </div>

          <div className={AdminStyle.child3}>
            <div className={AdminStyle.searchDiv}>
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter ID"
              />
              <button onClick={handleSearch} className={AdminStyle.CFAButton}>Search</button>
            </div>

            {postError && <p>{postError}</p>}

            {(post || comment) && (
              <div>
                <h2>{searchType === 'post' ? 'Post Details:' : 'Comment Details:'}</h2>
                {searchType === 'post' ? renderItemTable(post as Post) : renderItemTable(comment as Comment)}
                <button onClick={deleteItem} className={AdminStyle.DeleteBtn}>Delete {searchType === 'post' ? 'Post' : 'Comment'}</button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}



