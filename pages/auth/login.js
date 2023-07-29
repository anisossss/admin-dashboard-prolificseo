import Meta from "../../components/seo";
import Login from "../../components/auth/Login";

export default function LoginPage() {
  return (
    <>
      <Meta
        title="Admin Login - ProlificSEO Admin"
        description="PROLIFICSEO"
        ogUrl="https://prolificseo.com"
        thumbnail="https://i.postimg.cc/66LjPW53/thumbnail.png"
        keywords="SEO, organic seo, AI SEO"
      ></Meta>
      <Login />
    </>
  );
}
