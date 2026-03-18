const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzuzpYXiBnWjZAdKy_kJms92izhIhd2cwzK_888cCnKsuZtVreJAVh487oCXuV_Z7r-FQ/exec';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const submitToGoogleSheets = async (data: ContactFormData): Promise<boolean> => {
  try {
    const params = new URLSearchParams();
    params.append('name', data.name);
    params.append('email', data.email);
    params.append('message', data.message);

    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Apps Script requires no-cors for simple POST or it will fail due to redirect
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
    
    // With no-cors, we can't see the response status, 
    // but if it doesn't throw, we assume the browser sent it
    return true;
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return false;
  }
};
