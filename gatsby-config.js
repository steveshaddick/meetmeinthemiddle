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
  ],
};
