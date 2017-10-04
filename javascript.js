 $("#submit").on("click", function() {
            var search = $("#search-term").val().trim();
            var start = $("#start-date").val().trim();
            var end = $("#end-date").val().trim();

            $("#search-term").val("")
            $("#start-date").val("")
            $("#end-date").val("")
            $(".books").empty();

            var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
            url += '?' + $.param({
                'api-key': "9c50663a3f8a41f0aa37b27c629a17aa",
                'q': search,
                "begin_date": start,
                "end_date": end,
                "page": "123"
            });

            $.ajax({
                url: url,
                method: 'GET',
            }).done(function(result) {

                for (i = 0; i < result.response.docs.length; i++) {
                    var x = ("<p>") + result.response.docs[i].snippet + ("<p>");
                    var y = result.response.docs[i].web_url;

                    var button = $("<button>");

                    button.attr("data-let", y);
                    button.addClass("clickHere");

                    var p = $(button).append(x);
                    $(".books").append(p);

                    console.log(result);
                }

                $(".clickHere").on("click", function() {

                    window.open($(this).data("let"));
                })
            }).fail(function(err) {
                throw err;
            })

        });