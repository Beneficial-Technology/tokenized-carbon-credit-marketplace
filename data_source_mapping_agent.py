"""Data source mapping agent utilities."""

from __future__ import annotations

import csv
import json
from typing import Dict, List, Tuple


class DataSourceMappingAgent:
    """Agent for building a requirement to data source mapping.

    The agent reads an input CSV file describing requirements and their
    associated sensors and labs. It produces two artefacts:

    * A CSV mapping each ``requirement_id`` to its corresponding ``sensor``
      and ``lab`` values.
    * A JSON file containing the same mapping and a list of requirements
      missing either value.
    """

    def process(
        self,
        in_csv_path: str,
        out_csv_path: str,
        out_json_path: str,
    ) -> Tuple[Dict[str, Dict[str, str]], List[str]]:
        """Process the mapping from ``in_csv_path``.

        Parameters
        ----------
        in_csv_path:
            Path to the CSV file containing requirement mappings.
        out_csv_path:
            Path where the resulting CSV mapping should be written.
        out_json_path:
            Path where the JSON summary should be written.

        Returns
        -------
        tuple
            A tuple ``(mapping, missing)`` where ``mapping`` is a dictionary
            keyed by ``requirement_id`` and ``missing`` is a list of
            requirement IDs for which either ``sensor`` or ``lab`` is
            missing.

        Raises
        ------
        IOError
            If any of the files could not be read or written.
        """

        mapping: Dict[str, Dict[str, str]] = {}
        missing: List[str] = []

        try:
            with open(in_csv_path, newline="", encoding="utf-8") as infile:
                reader = csv.DictReader(infile)
                for row in reader:
                    requirement_id = row.get("requirement_id")
                    sensor = row.get("sensor")
                    lab = row.get("lab")

                    if not requirement_id:
                        continue

                    if sensor and lab:
                        mapping[requirement_id] = {"sensor": sensor, "lab": lab}
                    else:
                        missing.append(requirement_id)

            with open(out_csv_path, "w", newline="", encoding="utf-8") as outfile:
                writer = csv.DictWriter(
                    outfile, fieldnames=["requirement_id", "sensor", "lab"]
                )
                writer.writeheader()
                for req_id, values in mapping.items():
                    writer.writerow(
                        {
                            "requirement_id": req_id,
                            "sensor": values.get("sensor", ""),
                            "lab": values.get("lab", ""),
                        }
                    )

            with open(out_json_path, "w", encoding="utf-8") as jsonfile:
                json.dump(
                    {"mapping": mapping, "missing_requirements": missing},
                    jsonfile,
                    indent=2,
                )
        except OSError as exc:  # pragma: no cover - basic error handling
            raise IOError(f"Error processing files: {exc}") from exc

        return mapping, missing
