1. Created add with create-react-app
2. Added basic supporting packages
3. Scaffolding basic folder structure and initial pages
4. Fetching and rendering data
5. Added the --no-cache flag to make sure the debugger works correctly
6. Fixed App unit test and added stub HomePage unit test
7. Testing the HomePage component's data fetching
8. Added HomePage test case for error handling
9. Added Cypress to the project, and a navigation test
10. Added Cypress test to check the data fetching on the homepage, including a server mock
11. Extracted data fetching logic into useFetchData custom hook
12. Created withFetchData hoc and used it for the HomePage component
13. Reverted to use of useFetchData instead of withFetchData for HomePage component
14. Created FetchData render prop component and used it for the HomePage component
15. Reverted to use of useFetchData instead of FetchData for HomePage component
16. Added custom theme context
17. Added theme fallback value
18. Setting the toolbar background color in accordance with the theme
19. Added a custom theme context provider
20. Dynamically changing the theme
21. Added an MVP cache context
22. Wrapped cache's addItem with a useCallback hook
