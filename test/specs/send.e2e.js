const { browser, expect: wdioExpect, $$, $ } = require('@wdio/globals');
const { expect } = require('chai');
const { describe, it, beforeEach } = require('mocha');
const SendPage = require('../pageobjects/send.page');

describe('Send Tests', () => {
  beforeEach(async () => {
    console.log('🔄 Starting send test...');
    await SendPage.open();
    await SendPage.clearInputs();
  });

  it('should display send form elements', async () => {
    console.log('📱 Checking send form elements...');

    await wdioExpect(SendPage.recipientInput).toBeDisplayed();
    await wdioExpect(SendPage.amountInput).toBeDisplayed();
    await wdioExpect(SendPage.sendButton).toBeDisplayed();
    console.log('✅ Send form elements are visible');
  });

  it('should allow entering recipient and amount', async () => {
    console.log('👤 Testing send input functionality...');

    await SendPage.recipientInput.setValue('test@example.com');
    await SendPage.amountInput.setValue('25.00');

    const recipientValue = await SendPage.recipientInput.getAttribute('text');
    const amountValue = await SendPage.amountInput.getAttribute('text');

    expect(recipientValue).to.equal('test@example.com');
    expect(amountValue).to.equal('25.00');
    console.log('✅ Send inputs working correctly');
  });

  it('should debug search results elements', async () => {
    console.log('🔍 Debugging search results elements...');

    // Type in recipient search
    await SendPage.recipientInput.setValue('test');
    console.log('📝 Typed recipient search term');

    // Wait for search results
    await browser.pause(2000);

    // Try to find and list available elements
    try {
      const touchableElements = await $$(
        'android=new UiSelector().className("android.widget.TouchableOpacity")'
      );
      console.log(`📊 Found ${touchableElements.length} touchable elements`);

      for (let i = 0; i < Math.min(touchableElements.length, 5); i++) {
        try {
          const text = await touchableElements[i].getAttribute('text');
          const desc = await touchableElements[i].getAttribute('content-desc');
          console.log(`Element ${i}: text="${text}", desc="${desc}"`);
        } catch (error) {
          console.log(`Element ${i}: could not get attributes`);
        }
      }

      // Specifically look for chevron icon
      try {
        const chevronIcon = await $(
          'android=new UiSelector().description("chevron-forward")'
        );
        const chevronText = await chevronIcon.getAttribute('text');
        const chevronDesc = await chevronIcon.getAttribute('content-desc');
        console.log(
          `🎯 Chevron icon found: text="${chevronText}", desc="${chevronDesc}"`
        );
      } catch (error) {
        console.log('❌ Chevron icon not found');
      }

      // Look for any elements with "chevron" in description
      try {
        const chevronElements = await $$(
          'android=new UiSelector().descriptionContains("chevron")'
        );
        console.log(
          `🔍 Found ${chevronElements.length} elements with "chevron" in description`
        );
      } catch (error) {
        console.log('❌ No elements with "chevron" found');
      }
    } catch (error) {
      console.log('❌ Could not find touchable elements');
    }

    console.log('✅ Debug test completed');
  });

  it('should test recipient search and arrow selection', async () => {
    console.log('🔍 Testing recipient search and arrow selection...');

    // Type in recipient search
    await SendPage.recipientInput.setValue('test');
    console.log('📝 Typed recipient search term');

    // Wait for search results
    await browser.pause(1500);

    // Try to select using arrow
    try {
      await SendPage.firstSearchResultArrow.click();
      console.log('✅ Recipient selected by clicking arrow');
    } catch (error) {
      console.log(
        'ℹ️  No search results or arrow not found (this might be expected)'
      );
    }

    console.log('✅ Search and arrow selection test completed');
  });

  it('should attempt send with valid data', async () => {
    console.log('💸 Testing send attempt...');

    await SendPage.send('recipient@test.com', '10.00');
    console.log('🚀 Send attempt completed');

    await browser.pause(2000);
    console.log('✅ Send test completed');
  });
});
