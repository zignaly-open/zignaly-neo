import SibApiV3Sdk from 'sib-api-v3-typescript';

export const confirmEmail = async (userId: string) => {
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
  createDoiContact.redirectionUrl = `https://zigbids.zignaly.com/?confirm=${userId}}`;

  try {
    const response = await apiInstance.createDoiContact(createDoiContact);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
