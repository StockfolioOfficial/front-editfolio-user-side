interface TokenDataType {
  token?: string;
}

class FetchData {
  fetchLogin = async (values: any) => {
    try {
      const tokenData = await fetch('https://api-ef.stockfolio.ai/sign-in', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: values.email,
          password: values.phone.replaceAll('-', ''),
        }),
      }).then((res) => res.json());
      return tokenData as TokenDataType;
    } catch {
      console.error('로그인 터짐');
      return {};
    }
  };
}

export default FetchData;
