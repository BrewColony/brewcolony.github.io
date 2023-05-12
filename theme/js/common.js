
//SNS部分データソース
const snsData = [
    {
        href: "https://www.facebook.com",
        alt: "Facebook",
        iconClass: "icon-facebook2",
    },
    {
        href: "https://www.twitter.com",
        alt: "Twitter",
        iconClass: "icon-twitter2",
    },
    {
        href: "https://www.instagram.com/brew_colony_nasukarasuyama/",
        alt: "Instagram",
        iconClass: "icon-instagram",
    },
];

//Footer部分データソース
const footerData = {
    getInTouch: {
        title: "Contact Us",
        imageUrl: "/images/logo.png",
        imageAlt: "Brew Colony Logo",
        text1: "お気軽に連絡ください",
        text2: "質問、コラボレーションなんでもどうぞ",
        buttonText: "連絡する",
        buttonLink: "/contact/",
    },
    bannerFooter: [
        {
            href: "http://park18.wakwak.com/~omotenashi/",
            src: "/images/banner/nasukarasuyama_kankokyokai.jpg",
            alt: "那須烏山市観光協会",
        },
        // 他のバナーを追加する場合は、ここにオブジェクトを追加。
    ],
    copyright: "&copy; 2023 Brew Colony. All Rights Reserved.",
};

//SNS共通化処理
function createSnsHTML() {
    let snsHtml = `<div class="sns_follow">SNSでフォローしよう！</div><ul id="social">`;
    snsData.forEach((sns) => {
        snsHtml += `<li><a href="${sns.href}" alt="${sns.alt}"><i class="${sns.iconClass}"></i></a></li>`;
    });
    snsHtml += `</ul>`;
    return snsHtml;
}
document.getElementById("common-sns").innerHTML = createSnsHTML();



//Footer共通化処理
function createFooterHTML() {
    let footerHtml = `<div class="fh5co-footer">
                        <div class="float-clear">
                            <div id="get-in-touch">
                                <div class="row">
                                    <div class="col-md-12 animate-box" data-animate-effect="fadeInLeft">
                                        <p class="author">${footerData.getInTouch.title}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 col-md-offset-3 col-md-pull-3 animate-box" data-animate-effect="fadeInLeft">
                                        <div class="wrapper">
                                            <div class="fh5co-feature">
                                                <div class="fh5co-icon">
                                                    <a href="${footerData.getInTouch.buttonLink}"><img class="about-image" src="${footerData.getInTouch.imageUrl}" /></a>
                                                </div>
                                                <div class="fh5co-text">
                                                    <a href="${footerData.getInTouch.buttonLink}">
                                                        <p>${footerData.getInTouch.text1}</p>
                                                    </a>
                                                    <p>${footerData.getInTouch.text2}</p>
                                                    <p><a href="${footerData.getInTouch.buttonLink}" class="btn btn-primary contact-btn">${footerData.getInTouch.buttonText}</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="banner-footer">`;

    footerData.bannerFooter.forEach((banner) => {
        footerHtml += `<a href="${banner.href}"><img src="${banner.src}" alt="${banner.alt}"></a>`;
    });

    footerHtml += `</div></div><p><small>${footerData.copyright}</small></p></div>`;

    return footerHtml;
}

document.getElementById("footer-container").innerHTML = createFooterHTML();
