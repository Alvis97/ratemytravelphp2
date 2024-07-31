import { useEffect, useState } from 'react';
import Head from 'next/head';
import AdminStyle from '../styles/pages/admin.module.scss';

interface Report {
  id: string;
  reason: string;
  postId: string;
  userId: string;
  date:   string;
}

export default function Admin() {
  const [reports, setReports] = useState<Report[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await fetch('/api/fetchReports');
        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }
        const data: Report[] = await response.json();
        setReports(data);
      } catch (error) {
        setError('Error fetching reports');
        console.error('Error fetching reports:', error);
      }
    }

    fetchReports();
  }, []);

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
                  <th>ID</th>
                  <th>PostId</th>
                  <th>Reason</th>
                  <th>User Id</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.postId}</td>
                    <td>{report.reason}</td>
                    <td>{report.userId}</td>
                    <td>{report.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}


