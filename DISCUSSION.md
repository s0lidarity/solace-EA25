# Andrew's Upgrades for the Solace Assessment

## Significant Changes

1. Updated the styling to make the data easier to read and digest and added a color scheme to better reflect the Solace brand along with some light UX touch ups to help emphasize interactive elements.
1. Defined types for Advocates to assist with local development, eventually these should be pulled from the database.
1. Broke out the rows of the table of the application into their own component for readability and maintainability.
1. Updated the page.tsx file to apply filters, reset the filter, and added keys to mapped components.
1. Seeded the database and updated the seed route to be idempotent and avoid unnecessary rewrites. I ran into an issue on my machine with out of date postgres and docker installations and switched to Postgres14 to troubleshoot it.

## Next Steps

1. Run npm audit fix and update project vulnerabilities.
1. Overhaul the filters. Break out the filter and search into a bar with togglable filters that are populated with relevant options from the data set and can be applied granularly/intelligently. Show only specialties that are in the dataset, allow filtering for minimum/maximum experience, allow for filters that have inclusive sets (multiple states, multiple degrees, etc).
1. Add unit testing and behavioral testing. Define test coverage standards.
1. Establish CI/CD with deployments to a staging and a separate production environment.
1. Query the database based on filters instead of filtering/searching within the local dataset.
1. Add functionality to save filters to local storage so users can repeat frequent queries.
1. Add functionality to export/import saved filters so users can share commonly used queries.
