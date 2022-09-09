export default function (next, isLoggedIn, setLoginOpen) {
  if (!isLoggedIn) {
    next("/");
    setLoginOpen(true);
  } else {
    next();
  }
}
