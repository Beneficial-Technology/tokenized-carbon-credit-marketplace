"""Utilities for tracking and reviewing agent activity."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import List, Optional


@dataclass
class ActivityRecord:
    """Represents a single activity performed by an agent."""

    agent: str
    action: str
    timestamp: datetime


class AgentActivityTracker:
    """In-memory tracker for agent actions.

    The tracker keeps a simple list of :class:`ActivityRecord` instances.
    It can be used by different agents to log what they have done and later
    review the collected activities.
    """

    def __init__(self) -> None:
        self._records: List[ActivityRecord] = []

    def log(self, agent_name: str, action: str, *, timestamp: Optional[datetime] = None) -> ActivityRecord:
        """Log an activity for the given agent.

        Parameters
        ----------
        agent_name: str
            Name of the agent performing the action.
        action: str
            Description of the action.
        timestamp: datetime, optional
            When the action occurred. Defaults to :func:`datetime.utcnow`.

        Returns
        -------
        ActivityRecord
            The record that was stored.
        """
        if timestamp is None:
            timestamp = datetime.utcnow()
        record = ActivityRecord(agent=agent_name, action=action, timestamp=timestamp)
        self._records.append(record)
        return record

    def get_activity(self, agent_name: Optional[str] = None) -> List[ActivityRecord]:
        """Return activity records.

        Parameters
        ----------
        agent_name: str, optional
            If provided, only activities for this agent are returned.

        Returns
        -------
        List[ActivityRecord]
            A list of activity records.
        """
        if agent_name is None:
            return list(self._records)
        return [r for r in self._records if r.agent == agent_name]

    def list_agents(self) -> List[str]:
        """Return a sorted list of agents with recorded activity."""
        return sorted({record.agent for record in self._records})
