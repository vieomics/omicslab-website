const Newsletter = () => {
  return (
    <div className="band-dark mb-12 px-8 py-14 text-center sm:px-11">
      <h3 className="display-md mb-4 text-white">Join our newsletter!</h3>
      <p className="mb-8 text-sm text-white">
        Enter your email to receive our latest newsletter.
      </p>
      <form className="mx-auto flex max-w-[440px] flex-col gap-3">
        <input
          type="email"
          placeholder="Your email address"
          className="h-[50px] w-full border border-white/30 bg-transparent px-4 text-center text-base text-white placeholder:text-white"
        />
        <input
          type="submit"
          value="Subscribe Now"
          className="btn-editorial btn-editorial-inverse w-full cursor-pointer"
        />
      </form>
      <p className="mt-6 text-[11px] font-bold tracking-[0.14em] text-white uppercase">
        Don&#39;t worry, we don&#39;t spam
      </p>
    </div>
  );
};

export default Newsletter;
