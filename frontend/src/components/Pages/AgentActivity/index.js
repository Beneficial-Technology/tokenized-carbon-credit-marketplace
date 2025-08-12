import React, { Component } from "react";
import { Table } from 'rimble-ui';

import styles from '../../../App.module.scss';

export default class AgentActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [
                {
                    agent: 'ComplianceResearchAgent',
                    action: 'Downloaded document',
                    timestamp: '2024-01-01 12:00'
                }
            ]
        };
    }

    render() {
        const { activities } = this.state;
        return (
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
                        {activities.map((act, idx) => (
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
    }
}
