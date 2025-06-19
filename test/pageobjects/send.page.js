const { $, browser } = require('@wdio/globals');

class SendPage {
  get recipientInput() {
    return $('android=new UiSelector().resourceId("Recipient Input")');
  }

  get amountInput() {
    return $('android=new UiSelector().resourceId("Amount Input")');
  }

  get sendButton() {
    return $('android=new UiSelector().resourceId("Send Button")');
  }

  get title() {
    return $('android=new UiSelector().text("Send Money")');
  }

  get recipientLabel() {
    return $('android=new UiSelector().text("Recipient")');
  }

  get amountLabel() {
    return $('android=new UiSelector().text("Amount")');
  }

  get currencyLabel() {
    return $('android=new UiSelector().text("Currency")');
  }

  get searchResults() {
    return $('android=new UiSelector().resourceId("Search Results")');
  }

  get firstSearchResultArrow() {
    // Try to find the chevron icon within the first search result
    return $('android=new UiSelector().description("chevron-forward")');
  }

  get searchLoading() {
    return $('android=new UiSelector().text("Searching...")');
  }

  get successToast() {
    return $('android=new UiSelector().textContains("Send Successful")');
  }

  get errorToast() {
    return $('android=new UiSelector().textContains("Send Failed")');
  }

  async searchAndSelectRecipient(searchTerm) {
    await this.recipientInput.setValue(searchTerm);
    await browser.pause(1000); // Wait for search results

    // Try multiple approaches to select the first result
    try {
      // First try: click the chevron icon
      await this.firstSearchResultArrow.click();
      console.log('✅ Recipient selected by clicking chevron icon');
    } catch (error) {
      try {
        // Second try: click on the arrow container (the TouchableOpacity wrapper)
        const arrowContainer = $(
          'android=new UiSelector().className("android.widget.TouchableOpacity").index(2)'
        );
        await arrowContainer.click();
        console.log('✅ Recipient selected by clicking arrow container');
      } catch (secondError) {
        try {
          // Third try: click on the search result container
          const resultContainer = $(
            'android=new UiSelector().className("android.widget.TouchableOpacity").index(0)'
          );
          await resultContainer.click();
          console.log('✅ Recipient selected by clicking result container');
        } catch (thirdError) {
          console.log(
            '⚠️  Could not select recipient - no search results or selectors not working'
          );
        }
      }
    }
  }

  async send(recipient, amount, currency = 'USD') {
    await this.searchAndSelectRecipient(recipient);
    await this.amountInput.setValue(amount);
    await this.sendButton.click();
  }

  async open() {
    // Navigate to send tab - this would need to be implemented based on your navigation
    await browser.pause(1000);
  }

  async clearInputs() {
    await this.recipientInput.setValue('');
    await this.amountInput.setValue('');
  }

  async waitForSearchResults() {
    try {
      await this.searchResults.waitForDisplayed({ timeout: 3000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async waitForSuccessToast() {
    await this.successToast.waitForDisplayed({ timeout: 5000 });
  }

  async waitForErrorToast() {
    await this.errorToast.waitForDisplayed({ timeout: 5000 });
  }
}

module.exports = new SendPage();
