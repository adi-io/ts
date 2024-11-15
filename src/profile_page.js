import { useState } from "react";

export function ProfilePage() {
  const [email, setEmail] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    setMessage("");

    try {
      const reponse = await fetch("/TODO", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (reponse.ok) {
        setMessage("Password reset link sent successfully!");
        setEmail("");
      } else {
        setMessage("Failed to send the link, please try again");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setisLoading(false);
    }
  };
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="px-2 py-5 sm:p-20">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Update your Password
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>We will send you a link for restting the password.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 sm:flex sm:items-center">
          <div className="w-full sm:max-w-xs">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
          >
            Send
          </button>
        </form>
        {message && (
          <p
            className={`mt-2 text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
