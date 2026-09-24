const Blog = () => {
  return (
    <section className="section-pad">
      <div className="page-width">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* {blogData.map((blog) => (
            <div key={blog.id} className="w-full px-4 md:w-1/2 lg:w-1/3">
              <SingleBlog blog={blog} />
            </div>
          ))} */}
        </div>
      </div>
    </section>
  );
};

export default Blog;
