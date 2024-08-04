// pages/admin.tsx

import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import AdminStyle from '../styles/pages/admin.module.scss'; 
import Head from 'next/head'; 

interface Report {
  id: string;
  reason: string;
  postId: string;
  commentId?: string;
  userId: string;
  date: string;
  type: 'post' | 'comment';
}

interface Post {
  id: string;
  title: string;
  content: string;
}

interface Comment {
  id: string;
  content: string;
}

const AdminPage: React.FC = () => {
  const { data: session, status } = useSession();
  const [reports, setReports] = useState<Report[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchId, setSearchId] = useState<string>('');
  const [reportSearchId, setReportSearchId] = useState<string>('');
  const [searchType, setSearchType] = useState<'post' | 'comment'>('post');
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState<Comment | null>(null);
  const [postError, setPostError] = useState<string | null>(null);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session || session.user.role !== 'admin') {
    return <p>Access denied. Admins only.</p>;
  }

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

  const deleteReport = async () => {
    if (!reportSearchId) return;

    try {
      const reportEndpoint = `/api/report/${reportSearchId}`;
      const response = await fetch(reportEndpoint, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete report');
      }

      setReportSearchId('');
      setError(null);
      alert('Report deleted successfully');
      // Optionally refetch reports
      const updatedReports = reports.filter((report) => report.id !== reportSearchId);
      setReports(updatedReports);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      console.log('Error deleting report:', err);
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

           {/** Print report table */}
          <div className={AdminStyle.reportsSection}>
            {error && <p className={AdminStyle.error}>{error}</p>}
            <table className={AdminStyle.reportTable}>
              <thead>
                <tr>
                  <th className={AdminStyle.th}>Report ID</th>
                  <th className={AdminStyle.th}>Post ID</th>
                  <th className={AdminStyle.th}>Reason</th>
                  <th className={AdminStyle.th}>Comment ID</th>
                </tr>
              </thead>
              <tbody>
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan={4}>No reports</td>
                  </tr>
                ) : (
                  reports.map((report) => (
                    <tr key={report.id}>
                      <td className={AdminStyle.td}>{report.id}</td>
                      <td className={AdminStyle.td}>{report.postId}</td>
                      <td className={AdminStyle.td}>{report.reason}</td>
                      <td className={AdminStyle.td}>{report.commentId || 'N/A'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/** Search for post or comment with id */}
          <div className={AdminStyle.textSection2}>
            <p className={AdminStyle.p2}>Search for the Post/Comment ID:</p>
          </div>

          <div className={AdminStyle.child3}>
            <div className={AdminStyle.searchDiv}>
                <div>  
                <select
                className={AdminStyle.dropdown}
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as 'post' | 'comment')}
              >
                <option value="post">Post</option>
                <option value="comment">Comment</option>
              </select>
              </div>
          
              <div>
              <input
                className={AdminStyle.input}
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter post or comment ID"
              />
              <button onClick={handleSearch} className={AdminStyle.CFAButton}>
                Search
              </button>
              </div>
             
            </div>

            {postError && <p>{postError}</p>}

            {post && (
              <div className={AdminStyle.fetchedDiv}>
                <h2>Post Details:</h2>
                {renderItemTable(post)}
                <button onClick={deleteItem} className={AdminStyle.DeleteBtn}>
                  Delete Post
                </button>
              </div>
            )}

            {comment && (
              <div className={AdminStyle.fetchedDiv}>
                <h2>Comment Details:</h2>
                {renderItemTable(comment)}
                <button onClick={deleteItem} className={AdminStyle.DeleteBtn}>
                  Delete Comment
                </button>
              </div>
            )}

            {/** Delete report for post or comment with id */}
            <div className={AdminStyle.searchDiv}>
              <input
                className={AdminStyle.input}
                type="text"
                value={reportSearchId}
                onChange={(e) => setReportSearchId(e.target.value)}
                placeholder="Enter report ID"
              />
              <button onClick={deleteReport} className={AdminStyle.DeleteBtn}>
                Delete Report
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session }, // Pass any props if needed
  };
};

export default AdminPage;
