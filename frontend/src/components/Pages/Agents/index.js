import React from 'react';
import { Table } from 'rimble-ui';
import styles from '../../../App.module.scss';
import { sampleActivities } from '../AgentActivity/sampleData';

const Agents = () => {
  const agents = Array.from(new Set(sampleActivities.map(act => act.agent)));
  return (
    <div className={styles.wrapper}>
      <h2>Agents</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((name, idx) => (
            <tr key={idx}>
              <td>{name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Agents;
