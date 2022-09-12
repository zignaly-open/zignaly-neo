module.exports = {
  async postRender(page, context) {
    // the #root element wraps the story. From Storybook 7.0 onwards, the selector should be #storybook-root
    const elementHandler = await page.$('#root');
    const innerHTML = await elementHandler.innerHTML();
    expect(innerHTML).toMatchSnapshot();
  },
};
