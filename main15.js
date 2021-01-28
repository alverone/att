let $eventAppPackageRadios = $(":radio[name='eventAppPackage']:checked"),
    $streamingPackageRadios = $(":radio[name='streamingPackage']:checked"),
    $streamingRadios = $(":radio[name='streaming']:checked"),
    //$eventAppRadios = $(":radio[name='eventApp']:checked"),
    $total = $(".greytotalpackageprice"),
    sliderVal = 0,
    streamingVal = 0,
    eventEngVal = 0;

function handleGradient(e) {
    return "linear-gradient(90deg, #1a79ff " + e / 100 + "%, rgba(18, 36, 89, 0.1) " + e / 100 + "%)";
}

function parseFloatFromString(e) {
    return 1e3 * e.html().replace(/,/, ".").slice(1, e.html().length);
}

function getData(obj, data) {
    return parseInt(obj.data(data));
}

function formPriceString(e) {
    return "$" + e.toLocaleString();
}
$("#addPackageBtn").css("pointer-events", "none"),
    $(":radio[name='streaming'], :radio[name='eventApp'], #numberOfCredits").on("change", function (e) {
        let a = +$(":radio[name='streaming']:checked").data("price") + 1999 + +$(":radio[name='eventApp']:checked").data("price");
        $("#engagementPrice").html(formPriceString(a)), $("#engagementPriceTotal").html(formPriceString(a * parseInt($("#numberOfCredits").val())));
    });

$(":radio[name='eventAppPackage']").on("change", function () {
    parseInt($(this).data("price")) > 0 ?
        ($("#addPackageBtn").removeClass("disabled"), $("#brandedEventsHeading").css("display", "flex"), $("#dataPrice").html(formPriceString(parseInt($(this).data("price"))))) :
        ($("#addPackageBtn").addClass("disabled"), $("#brandedEventsHeading").toggle(!1), $("#dataPrice").html("$0"));
    let e = 1999 * (parseInt($(".rangeSlider").val()) - 1) + getData($eventAppPackageRadios);
    $("#custom").data("price", e), $("#customExpPackagePrice, #totalPackagePrice").html(formPriceString(e));
});

$(":radio[name='streamingPackage']").on("change", function (e) {
    "youtube, video or zoom" == $(this).val() ?
        ($(".streamingcontainer").toggle(!1), $("#streamingPrice").html("$0")) :
        ($(".streamingcontainer").css("display", "flex"), $(".streamingname").html($(":radio[name='streamingPackage']:checked").val()), $(".streamingprice").html(formPriceString(getData($(this), "price")))), (streamingVal = $(this).data("price"));
});

$(":radio[name='eventAppPackageTotal'], :radio[name='streamingPackage']").on("change", function () {
    let defaultPrice = 4000;
    $(".greytotalpackageprice").html(formPriceString(defaultPrice + getData($(":radio[name='streamingPackage']:checked"), "price") + getData($(":radio[name='eventAppPackageTotal']:checked"), "price")));
});

$(":radio[name='eventApp'], :radio[name='streaming']").on("change", function () {
    if ($("#customBuyStreaming").is(":visible")) {
        $("#ownStreaming").toggle(false);
    } else {
        $("#ownStreaming").toggle(true);
    }

    if ($("#brandedAppChoice").is(":visible")) {
        $("#attendifyAppChoice").toggle(false);
    } else {
        $("#attendifyAppChoice").toggle(true);
    }
});
$(":radio[name='eventAppPackageTotal']").on("change", function () {
    $("#custom").prop("checked") ? $(".customexpcontainer").css("display", "flex") : $(".customexpcontainer").toggle(!1),
        $("#brandedTotal").prop("checked") ? $(".brandedappcontainer").css("display", "flex") : $(".brandedappcontainer").toggle(!1);
});

$("#addPackageBtn").on("click", function (e) {
    e.preventDefault(),
        $(".customize-modal").animate({
            opacity: 0
        }, 400, function () {
            $(".customize-modal").css("display", "none");
        }),
        $("#customizeOption").css("display", "flex"),
        $("#customizeOptionUpper").removeClass("bottom");
});


$("#rangeSlider").on("input", function (e) {
    let a = parseInt($(this).val()) / 100,
        t = "linear-gradient(90deg, #1a79ff " + a + "%, rgba(18, 36, 89, 0.1) " + a + "%)";
    $(this).siblings(".sliderValue").val($(this).val()), $(this).css("background", t);
    let i,
        n,
        r = parseInt($(this).val());
    r <= 500 ?
        $(".additionalregcreditscontainer").toggle(!1) :
        (r > 500 && $(".additionalregcreditscontainer").css("display", "flex"),
            r > 500 && r < 1e3 ? (n = 8) : r >= 1e3 && r < 2e3 ? (n = 7) : r >= 2e3 && r < 5e3 ? (n = 6) : r >= 5e3 && (n = 5),
            (i = (r - 500) * n),
            $("#additionalRegPrice").html(formPriceString(i)),
            $("#additionalCreditsAmount").html(r - 500),
            (sliderVal = i),
            $total.html(formPriceString(4e3 + i + getData($eventAppPackageRadios, "price") + getData($streamingPackageRadios, "price"))));
});

$("#rangeSlider")
    .siblings("input")
    .on("input", function () {
        $(this).val(this.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1")), parseInt($(this).val()) > 1e4 ? $(this).val(1e4) : "" === $(this).val() && $(this).val(0), "0" === $(this).val()[0] && $(this).val(+$(this).val());
        let e,
            a,
            t = parseInt($(this).val());
        t <= 500 ?
            $(".additionalregcreditscontainer").toggle(!1) :
            (t > 500 && $(".additionalregcreditscontainer").css("display", "flex"),
                t > 500 && t < 1e3 ? (a = 8) : t >= 1e3 && t < 2e3 ? (a = 7) : t >= 2e3 && t < 5e3 ? (a = 6) : t >= 5e3 && (a = 5),
                (sliderVal = e = (t - 500) * a),
                $("#additionalRegPrice").html(formPriceString(e)),
                $("#additionalCreditsAmount").html(t - 500),
                $total.html(formPriceString(4e3 + e + getData($eventAppPackageRadios, "price") + getData($streamingPackageRadios, "price"))));
    });
$(".rangeSlider").on("input", function (e) {
    let a = 5.264 * (parseInt($(this).val()) - 1),
        t = "linear-gradient(90deg, #1a79ff " + a + "%, rgba(18, 36, 89, 0.1) " + a + "%)";
    $(this).siblings(".sliderValue").val($(this).val()), $(this).css("background", t);
    let i = 1999 * (parseInt($(this).val()) - 1);
    if (i <= 0) {
        if (($("#additionalEvents").toggle(!1), 0 == getData($eventAppPackageRadios, "price")))
            return $("#addPackageBtn").addClass("disabled"), $("#addPackageBtn").css("pointer-events", "none"), void $("#totalPackagePrice").html("$0");
    } else parseInt($(this).val()) > 1 && ($("#addPackageBtn").removeClass("disabled"), $("#additionalEvents").css("display", "flex"), $("#addPackageBtn").css("pointer-events", ""), $("#additionalEventsValue").html(i / 1999), $("#additionalEventsPrice").html(formPriceString(i)));
    let n = i + getData($eventAppPackageRadios, "price");
    $("#custom").data("price", n), $(".customexppackageprice, #totalPackagePrice, #customPackagePrice").html(formPriceString(n));
});
$("#rangeSlider")
    .siblings(".sliderValue")
    .on("input", function (e) {
        $(this).siblings("input").val($(this).val()),
            $(this)
            .siblings("input")
            .css("background", handleGradient(parseInt($(this).val())));
    });
$(".rangeSlider")
    .siblings(".sliderValue")
    .on("input", function (e) {
        if (($(this).val(this.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1")), parseInt($(this).val()) > 20 && $(this).val(20), "0" === $(this).val()[0])) $(this).val(+$(this).val());
        else if ("" === $(this).val()) {
            $(this).siblings("input").val(1);
            let e = getData($eventAppPackageRadios, "price").toLocaleString();
            return $("#custom").data("price", e), void $("#customExpPackagePrice, #totalPackagePrice, #customPackagePrice").html(formPriceString(e));
        }
        if (parseInt($(this).val()) < 2 && getData($eventAppPackageRadios, "price")) {
            $(this).siblings("input").val(1);
            let e = getData($eventAppPackageRadios, "price").toLocaleString();
            return $("#custom").data("price", e), void $("#customExpPackagePrice, #totalPackagePrice, #customPackagePrice").html(formPriceString(e));
        }
        $(this).siblings("input").val($(this).val()),
            $(this)
            .siblings("input")
            .css("background", "linear-gradient(90deg, #1a79ff " + 5.264 * (parseInt($(this).val()) - 1) + "%, rgba(18, 36, 89, 0.1) " + 5.264 * (parseInt($(this).val()) - 1) + "%)");
        let a = 1999 * (parseInt($(this).val()) - 1);
        if (a <= 0) {
            if (($("#additionalEvents").toggle(!1), 0 == getData($eventAppPackageRadios, "price")))
                return $("#addPackageBtn").addClass("disabled"), $("#addPackageBtn").css("pointer-events", "none"), void $("#totalPackagePrice").html("$0");
        } else parseInt($(this).val()) > 1 && ($("#addPackageBtn").removeClass("disabled"), $("#additionalEvents").css("display", "flex"), $("#addPackageBtn").css("pointer-events", ""), $("#additionalEventsValue").html(a / 1999), $("#additionalEventsPrice").html(formPriceString(a)));
        let t = a + getData($eventAppPackageRadios, "price");
        $("#custom").data("price", t), $("#customExpPackagePrice, #customPackagePrice, #totalPackagePrice").html(formPriceString(t));
    });
$(".rangeSlider")
    .siblings(".sliderValue")
    .on("focusout", function (e) {
        if (!$(this).val()) {
            $(this).val(1);
            let e = getData($eventAppPackageRadios, "price").toLocaleString();
            $("#custom").data("price", e), $("#customExpPackagePrice, #customPackagePrice, #totalPackagePrice").html(formPriceString(e));
        }
    }),
    $(".customize-modal").on("keydown", ":input:not(textarea):not(:submit)", function (e) {
        if (13 == e.keyCode) return e.preventDefault(), !1;
    });

$(".credits").on("click", function () {
    let currentValue = parseFloat($("#engagementPrice").html().replace("$", "").replace(",", ""));
    $("#engagementPriceTotal").html(formPriceString(2 * currentValue));
});

$(".numericContainer")
    .children("button")
    .on("click", function (e) {
        e.preventDefault();
        let value = parseInt($(this).siblings("input").val());
        let btnAction = getData($(this), "increment");
        if ((value === 1) && (btnAction === -1)) {
            $(this).siblings("input").val(1);
        } else if ((value === 10) && (btnAction === 1)) {
            $(this).siblings("input").val(10);
        } else {
            $(this)
                .siblings("input")
                .val(value + $(this).data("increment"));
        }
    });
