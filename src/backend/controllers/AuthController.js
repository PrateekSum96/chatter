import { v4 as uuid } from "uuid";
import { Response } from "miragejs";
import { formatDate } from "../utils/authUtils";
import jwt_decode from "jwt-decode";
const sign = require("jwt-encode");

/**
 * All the routes related to Auth are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles user signups.
 * send POST Request at /api/auth/signup
 * body contains {firstName, lastName, username, password}
 * */

export const signupHandler = function (schema, request) {
  const { username, password, email, ...rest } = JSON.parse(
    request.requestBody
  );
  try {
    // check if username already exists
    const foundUser = schema.users.findBy({ username: username });
    const foundUserEmail = schema.users.findBy({ email: email });
    if (foundUser || foundUserEmail) {
      return new Response(
        422,
        {},
        {
          errors: ["Unprocessable Entity. Username or Email Already Exists."],
        }
      );
    }
    const _id = uuid();

    const newUser = {
      _id,
      createdAt: formatDate(),
      updatedAt: formatDate(),
      username,
      password,
      email,
      ...rest,
      followers: [],
      following: [],
      bookmarks: [],
    };
    const createdUser = schema.users.create(newUser);
    const encodedToken = sign(
      { _id, username },
      process.env.REACT_APP_JWT_SECRET
    );
    return new Response(201, {}, { createdUser, encodedToken });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles user login.
 * send POST Request at /api/auth/login
 * body contains {username, password}
 * */

export const loginHandler = function (schema, request) {
  const { email, password } = JSON.parse(request.requestBody);
  try {
    const foundUser = schema.users.findBy({ email: email });

    if (!foundUser) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }

    if (password === foundUser.password) {
      const { username } = foundUser;
      const encodedToken = sign(
        { _id: foundUser._id, username },
        process.env.REACT_APP_JWT_SECRET
      );
      return new Response(200, {}, { foundUser, encodedToken });
    }
    return new Response(
      401,
      {},
      {
        errors: [
          "The credentials you entered are invalid. Unauthorized access error.",
        ],
      }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles user verification.
 * send POST Request at /api/auth/verify
 * body contains {encodedToken}
 * */

export const verifyUser = function (schema, request) {
  const { encodedToken } = JSON.parse(request.requestBody);
  const decodedToken = jwt_decode(
    encodedToken,
    process.env.REACT_APP_JWT_SECRET
  );
  try {
    if (decodedToken) {
      const user = this.db.users.findBy({ username: decodedToken.username });
      if (user) {
        // return user;
        return new Response(200, {}, { user });
      }
    }
    return new Response(
      401,
      {},
      { errors: ["The token is invalid. Unauthorized access error."] }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
