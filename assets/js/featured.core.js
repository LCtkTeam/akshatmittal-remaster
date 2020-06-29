YT.pins = {
    url: "https://promote.counts.live/api/get",
    getPins: function () {
        $.getJSON(this.url, function (e) {
            $pn = $("#pinned_nav");
            $pn.html("");
            $pn.append($('<li class="nav-small-cap">FEATURED USERS</li>'));
            var users = e.users.filter(e => e.service === "youtube-subscriber-count");

            $.when.apply(null, users.map(e => $.getJSON("https://counts.live/api/" + e.service + "/" + e.id + "/data"))).done(function () {
                for (var x in arguments) {
                    var f = arguments[x];
                    if (!f.success) continue;
                    $li = $("<li>");
                    $a = $("<a>", {
                        class: "waves-effect waves-dark",
                        href: "#!/" + f.data.lv_identifier
                    });
                    $i = $("<i>", {
                        class: "fa fa-user"
                    });
                    $a.append($i);
                    $span = $("<span>", {
                        class: "hide-menu"
                    }).text(f.data.name);
                    $a.append($span);
                    $li.append($a);
                    $pn.append($li);
                }
                $pn.append($('<li><a class="waves-effect waves-dark" href="https://promote.counts.live" target="_blank"><i class="fa fa-link"></i><span class="hide-menu">Your Channel Here</span></a></li>'))
            });
        })
    }
}