// <Route path="/" element = {< Layout />}>
//   <Route index element = {< WelcomePage />} />
//     < Route
// path = "boards"
// element = {
//           < RequireAuth >
//   <BoardList />
//   < /RequireAuth>
//         }
// />
//   < Route
// path = "boards/:id"
// element = {
//           < RequireAuth >
//   <Board />
//   < /RequireAuth>
//         }
// />
//   < Route
// path = "form"
// element = {
//           < RequireAuth >
//   <AuthPage />
//   < /RequireAuth>
//         }
// />
//   < Route path = "*" element = {< NoFoundPage />} />
//     < /Route>
//     < /Routes>

export const ROOT_PATH = '/';
export const BOARDS_PATH = '/boards';
export const BOARDS_ID_PATH = '/boards/:id';
export const EDIT_PATH = '/edit';
export const AUTHENTICATION_PATH = '/authentication';
export const ANYTHING_PATH = '/*';
