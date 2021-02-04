// import jwt from "jsonwebtoken";
// import express from "express";
//
// const loginController = (userId, userRole) => {
//     try {
//         // todo: move auth fn to some controller instead of context
//         // todo: set access-token to 15 min after test
//         const user = await ctx.authenticate(input);
//
//         // access-token cookie is http-only and keeps user information
//         // login-token is not http-only - user can destroy this cookie to logout
//         // both cookies have to be valid to authenticate user
//         const accessToken = jwt.sign(
//             {userId: user._id, userRole: user.role},
//             process.env.JWT_ACCESS_TOKEN_SECRET,
//             {expiresIn: '1m'}
//         );
//         (ctx.res as express.Response).cookie('access-token', accessToken, {
//             expires: new Date(Date.now() + (1000 * 60)),
//             httpOnly: true,
//         });
//
//         const accessToken2 = jwt.sign({}, process.env.JWT_LOGIN_TOKEN_SECRET,
//             {expiresIn: '1m'}
//         );
//         (ctx.res as express.Response).cookie('login-token', accessToken2, {
//             expires: new Date(Date.now() + (1000 * 60)),
//         });
//
//         return true;
//     } catch (e) {
//         return e;
//     }
// };
//
// export default loginController;
