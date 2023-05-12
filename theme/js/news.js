    const blogData = [
        {
            imageSrc: "/images/polca.jpg",
            pageLink: "/article/templete/",
            altText: "テンプレートです",
            title: "テンプレート",
            date: "20yy-MM-dd",
            category: "新商品",
            summary: "テンプレートです",
        }, {
            imageSrc: "/images/polca.jpg",
            pageLink: "/article/templete/",
            altText: "テンプレートです",
            title: "テンプレート",
            date: "20yy-MM-dd",
            category: "新商品",
            summary: "テンプレートです",
        }, {
            imageSrc: "/images/polca.jpg",
            pageLink: "/article/templete/",
            altText: "テンプレートです",
            title: "テンプレート",
            date: "20yy-MM-dd",
            category: "新商品",
            summary: "テンプレートです",
        }, {
            imageSrc: "/images/polca.jpg",
            pageLink: "/article/templete/",
            altText: "テンプレートです",
            title: "テンプレート",
            date: "20yy-MM-dd",
            category: "新商品",
            summary: "テンプレートです",
        }, {
            imageSrc: "/images/polca.jpg",
            pageLink: "/article/templete/",
            altText: "テンプレートです",
            title: "テンプレート",
            date: "20yy-MM-dd",
            category: "新商品",
            summary: "テンプレートです",
        },
        // 記事が増えたら下に"{~~},"の範囲を追加

    ];

    //newsタイル生成
    function createBlogEntryHTML(entry, index) {
        const newLabelHTML = index <= 2 ? `<span class="new-label">NEW</span>` : "";

        return `
    <div class="col-md-4 col-sm-6 col-padding animate-box" data-animate-effect="fadeInLeft">
      <div class="blog-entry">
        <a href="${entry.pageLink}" class="blog-img">
          ${newLabelHTML}
          <img src="${entry.imageSrc}" class="img-responsive" alt="${entry.altText}">
        </a>
        <div class="desc">
          <h3 class="mH_tit"><a href="${entry.pageLink}">${entry.title}</a></h3>
          <span><small>${entry.date}</small></span>
          <span class="mH_aut_and_cat"><small>${entry.category}</small></span>
          <p class='mH_sum'>${entry.summary}</p>
          <a href="${entry.pageLink}" class="btn btn-primary read_more">Read more <i class="icon-arrow-right3"></i></a>
        </div>
      </div>
    </div>`;
    }
    const blogEntriesContainer = document.getElementById("blog-entries");
    const topThreeBlogEntriesContainer = document.getElementById("top-three-blog-entries");

    if (blogEntriesContainer) {
        let blogEntriesHTML = "";
        for (const [index, entry] of blogData.entries()) {
            blogEntriesHTML += createBlogEntryHTML(entry, index);
        }
        blogEntriesContainer.innerHTML = blogEntriesHTML;
    }

    if (topThreeBlogEntriesContainer) {
        const topThreeEntries = blogData.slice(0, 3);
        let topThreeEntriesHTML = '';

        for (const [index, entry] of topThreeEntries.entries()) {
            topThreeEntriesHTML += createBlogEntryHTML(entry, index);
        }
        topThreeBlogEntriesContainer.innerHTML = topThreeEntriesHTML;
    }