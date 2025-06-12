describe('Sanity Test', () => {
  it('should open the app', async () => {
    const status = await browser.status();
    console.log('Driver status:', status);
  });
});
