from dataclasses import dataclass


@dataclass
class Requirement:
    """Model representing a generic requirement."""
    id: str
    description: str
