module.exports = {
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
  },
};
