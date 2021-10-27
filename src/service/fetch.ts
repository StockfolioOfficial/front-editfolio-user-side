class FetchData {
  fetchLogin = (values: any) => {
    return fetch('https://api-ef.stockfolio.ai/sign-in', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username: values.email,
        password: values.phone.replaceAll('-', ''),
      }),
    }).then((res) => {
      if (res.status > 400) return res;
      return res.json();
    });
  };
}

export default FetchData;
