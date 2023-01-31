import SibApiV3Sdk from 'sib-api-v3-typescript';

const apiInstance = new SibApiV3Sdk.ContactsApi();

apiInstance.setApiKey(
  SibApiV3Sdk.ContactsApiApiKeys.apiKey,
  process.env.SENDINBLUE_API_KEY,
);

const createDoiContact = new SibApiV3Sdk.CreateDoiContact(); // CreateDoiContact | Values to create the Double opt-in (DOI) contact

createDoiContact.email = 'jservatlorca@gmail.com';
createDoiContact.attributes = { FNAME: 'Josep', LNAME: 'Test' };
createDoiContact.includeListIds = [2];
createDoiContact.templateId = 4;
createDoiContact.redirectionUrl = 'https://zigbids.zignaly.com/?confirm=USERID';

apiInstance.createDoiContact(createDoiContact).then(
  function () {
    console.log('API called successfully.');
  },
  function (error) {
    console.error(error);
  },
);
