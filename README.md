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
23. Using the cache store to optimizethe useFetchData hook
24. Added refetch method to the useFetchData hook
25. Added Redux store
26. Added Redux Devtools integration
27. Selected the Redux store data on the homepage feed instead of fetching data with useFetchData
28. Selecting the currently logged in user in the toolbar
29. Data fetching with useEffect, but dispatching the fetched data to Redux
30. Typing dispatch
31. Handling the posts fetched action in the reducer
32. Added back error/loading status, but with Redux
33. Added logout functionality with Redux
34. Installed Redux-Thunk, and using a thunk to fetch the homepage feed
35. Thunk action creator, to fetch homepage posts for a particular tag
36. Moved darkmode setting to redux, and replaced theme context with useTheme helper hook
37. Caching homepage feed results in the thunk
38. Sliced the store's state
39. Installed Okta and added a secure route
40. Added Okta's login callback helper component
41. Split the navbar out of the app component, and some cleaning up
42. Added useAuthSync hook
43. Fetching user's profile from CCN api on login
44. Updating the navbar to reflect the user's auth state, and making the login and logout buttons work
