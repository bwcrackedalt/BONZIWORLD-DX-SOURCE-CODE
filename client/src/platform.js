//App showcase
$(".app_showcase").append(
      '<a>' +
        '<img src="./img/app/desktop.png" alt="asdfghjklñ" />' +
      '</a>'
    );
$(".app_showcase").append(
      '<a href="https://404bonzi.neocities.org">' +
        '<img src="https://files.catbox.moe/2w7i4n.png" alt="asdfghjklñ" />' +
      '</a>'
    );
$(".app_showcase").append(
      '<a>' +
        '<img src="https://files.catbox.moe/c12ly0.png" alt="asdfghjklñ" />' +
      '</a>'
    );
$(".app_showcase").append(
      '<a>' +
        '<img src="https://files.catbox.moe/q6edkz.png" alt="asdfghjklñ" />' +
      '</a>'
 );
$(".app_showcase").append(
      '<a href="extra/comeback.html">' +
        '<img src="https://files.catbox.moe/z1uxuq.png" alt="asdfghjklñ" />' +
      '</a>'
    );
//badges
const badges = [
  "antinft",
  "aoltos_a",
  "best_chrome",
  "best_viewed_with_eyes",
  "bestviewedcomp",
  "bookmark_this_page",
  "cooltxt",
  "desp-anim",
  "google_25wht",
  "html_learn_it_today",
  "rainbow_bev",
  "screw",
  "stop",
  "transnow2",
  "wii",
];

badges.forEach((badge) => {
  $(".badge-showcase").append(
      '<a>' +
       '<img src="./img/badges/' + badge + '.gif" alt="asdfghjklñ" />' +
      '</a>'
    );
});
