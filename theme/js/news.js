    const blogData = [
        {
            imageSrc: "/images/polimages/hero/yoruichi_poster.jpg",
            pageLink: "/article/20230802/",
            altText: "黒磯日用夜市",
            title: "黒磯日用夜市",
            date: "2023-08-02",
            category: "イベント",
            summary: "黒磯日用夜市に出店します",
        }, 
        
        // 記事が増えたら下に"{~~},"の範囲を追加

    ];

const itemsPerPage = 6; // 1ページあたりの表示項目数
let currentPage = 1; // 現在のページ番号（初期値は1）

// newsタイル生成
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
const pageInfoContainer = document.getElementById("page-info");

function updatePagination(page) {
    // 全てのボタンから `current-page` クラスを削除
    const buttons = document.getElementsByClassName('pagination-button');
    for (let button of buttons) {
        button.classList.remove('current-page');
    }

    // 選択されたボタンに `current-page` クラスを追加
    const selectedButton = document.getElementById(`pagination-button-${page}`);
    if (selectedButton) {
        selectedButton.classList.add('current-page');
    }
}

function displayPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, blogData.length); // 全項目数を超えないようにする
    const pageItems = blogData.slice(start, end);

    const blogEntriesContainer = document.getElementById("blog-entries");
    if (blogEntriesContainer) {
        let blogEntriesHTML = "";
        for (const [index, entry] of pageItems.entries()) {
            blogEntriesHTML += createBlogEntryHTML(entry, index);
        }
        blogEntriesContainer.innerHTML = blogEntriesHTML;
    }
    // ページ情報の更新
    if (pageInfoContainer) {
        pageInfoContainer.innerHTML = `${page}ページ目　${blogData.length}件中${start + 1}〜${end}件を表示`;
    }
    // ページ番号の更新とページネーションの更新
    currentPage = page;
    updatePagination(currentPage);
}

function createPagination() {
    const totalPages = Math.ceil(blogData.length / itemsPerPage);
    const paginationContainer = document.getElementById("pagination");

    if (paginationContainer) {
        let paginationHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            // id を追加して、後で選択できるようにする
            const buttonClass = i === currentPage ? "pagination-button current-page" : "pagination-button";
            paginationHTML += `<a href="#fh5co-main"><button id="pagination-button-${i}" class="${buttonClass}" onclick="displayPage(${i}); setTimeout(window.contentWayPoint, 0);">${i}</button></a>`;
        }
        paginationContainer.innerHTML = paginationHTML;
    }
}


displayPage(currentPage);
createPagination();



if (topThreeBlogEntriesContainer) {
    const topThreeEntries = blogData.slice(0, 3);
    let topThreeEntriesHTML = '';
    for (const [index, entry] of topThreeEntries.entries()) {
        topThreeEntriesHTML += createBlogEntryHTML(entry, index);
    }
    topThreeBlogEntriesContainer.innerHTML = topThreeEntriesHTML;
    setTimeout(window.contentWayPoint, 0);
}