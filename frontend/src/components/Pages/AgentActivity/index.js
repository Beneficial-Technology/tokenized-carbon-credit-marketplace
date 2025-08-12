import React from 'react';
import { Table } from 'rimble-ui';
import styles from '../../../App.module.scss';
import { sampleActivities } from './sampleData';

const AgentActivity = () => (
  <div className={styles.wrapper}>
    <h2>Agent Activity</h2>
    <Table>
      <thead>
        <tr>
          <th>Agent</th>
          <th>Action</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {sampleActivities.map((act, idx) => (
          <tr key={idx}>
            <td>{act.agent}</td>
            <td>{act.action}</td>
            <td>{act.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default AgentActivity;
