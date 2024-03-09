"use client";

import React from "react";

import { StytchLogin } from "@stytch/nextjs";
import { Products } from "@stytch/vanilla-js";

import { getDomainFromWindow } from "../../../lib/urlUtils";

function LoginTop() {
  const styles = {
    container: {
      width: "100%",
    },
    buttons: {
      primary: {
        backgroundColor: "#4A37BE",
        borderColor: "#4A37BE",
      },
    },
  };

  const config = {
    products: [Products.emailMagicLinks, Products.oauth],
    emailMagicLinksOptions: {
      loginRedirectURL: getDomainFromWindow() + "/authenticate",
      loginExpirationMinutes: 60,
      signupRedirectURL: getDomainFromWindow() + "/authenticate",
      signupExpirationMinutes: 60,
    },
    oauthOptions: {
      providers: [
        {
          type: "github",
        },
      ],
      loginRedirectURL: getDomainFromWindow() + "/authenticate",
      signupRedirectURL: getDomainFromWindow() + "/authenticate",
    },
  } as Parameters<typeof StytchLogin>[0]["config"];

  return <StytchLogin config={config} styles={styles} />;
}

export default LoginTop;
