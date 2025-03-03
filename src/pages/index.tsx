import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const sections = [
  { title: 'Introduction', link: '/intro', description: 'Overview of the project' },
  { title: 'Installation', link: '/installation', description: 'Get the project up and running' },
  { title: 'API Integration', link: '/api-and-state', description: 'API Integration & State Management' },
  { title: 'Challenges Faced', link: '/challenges', description: 'Challenges & Solutions' },
];

export default function Home(): JSX.Element {
  return (
    <Layout >
        <main className={styles.container}>
            <h1 className={styles.title}>Crypto Price Tracker Docs</h1>
            <div className={styles.grid}>
                {sections.map((section, idx) => (
                    <Link key={idx} className={styles.card} to={section.link}>
                        <h2>{section.title}</h2>
                        <p>{section.description}</p>
                    </Link>
                ))}
            </div>
        </main>
    </Layout>
  );
}
