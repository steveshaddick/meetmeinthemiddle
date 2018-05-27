module.exports = {
  siteMetadata: {
    title: 'Meet Me In The Middle',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-eslint',
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-next',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Tajawal:400,500,600`],
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-5XHLW24',

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
      },
    },
  ],
};
