from dataclasses import dataclass


@dataclass
class Requirement:
    """Represents a compliance requirement with an associated document."""

    name: str
    document_url: str
    description: str = ""
