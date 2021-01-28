let $eventAppPackageRadios = $(":radio[name='eventAppPackage']:checked"),
    $eventAppPackageTotalRadios = $(":radio[name='eventAppPackageTotal']:checked"),
    $streamingPackageRadios = $(":radio[name='streamingPackage']:checked"),
    $streamingRadios = $(":radio[name='streaming']:checked"),
    //$eventAppRadios = $(":radio[name='eventApp']:checked"),
    $total = $(".greytotalpackageprice"),
    sliderVal = 0,
    streamingVal = 0,
    eventEngVal = 0;

$("#addPackageBtn").css("pointer-events", "none");

$(":radio[name='streaming'], :radio[name='eventApp'], #numberOfCredits").on("change", function (e) {
    let a = getData($(":radio[name='streaming']:checked"), "price") + 1999 + getData($(":radio[name='eventApp']:checked"), "price");
    $("#engagementPrice").html(formPriceString(a)), $("#engagementPriceTotal").html(formPriceString(a * getValue($("#numberOfCredits"))));
});

$(":radio[name='eventAppPackage']").on("change", function () {
    parseInt($(this).data("price")) > 0 ?
        ($("#addPackageBtn").removeClass("disabled"), setFlex($("#brandedEventsHeading")), $("#dataPrice").html(formPriceString(getData($(this), "price")))) :
        ($("#addPackageBtn").addClass("disabled"), hide($("#brandedEventsHeading")), $("#dataPrice").html("$0"));
    let e = 1999 * (getValue($(".rangeSlider")) - 1) + getData($eventAppPackageRadios);
    $("#custom").data("price", e), $("#customExpPackagePrice, #totalPackagePrice").html(formPriceString(e));
});

$(":radio[name='streamingPackage']").on("change", function (e) {
    "youtube, vimeo or zoom" == $(this).val() ?
        (hide($(".streamingcontainer")), $("#streamingPrice").html("$0")) :
        (setFlex($(".streamingcontainer")), $(".streamingname").html($(":radio[name='streamingPackage']:checked").val()), $(".streamingprice").html(formPriceString(getData($(this), "price")))), (streamingVal = $(this).data("price"));
});

$(":radio[name='eventAppPackageTotal'], :radio[name='streamingPackage']").on("change", function () {
    let defaultPrice = 4000;
    $total.html(formPriceString(defaultPrice + getSliderPrice($("#rangeSlider")) + getData($(":radio[name='streamingPackage']:checked"), "price") + getData($(":radio[name='eventAppPackageTotal']:checked"), "price")));
});

$(":radio[name='eventApp'], :radio[name='streaming']").on("change", function () {
    $("#engagementPriceTotal").html($("#engagementPrice").html());

    if (getData($(":radio[name='eventApp']:checked"), "price") > 0) {
        hide($("#attendifyAppChoice"));
        setFlex($("#brandedAppChoice"));
    } else {
        hide($("#brandedAppChoice"));
        setFlex($("#attendifyAppChoice"));
    }

    if (getData($(":radio[name='streaming']:checked"), "price") > 0) {
        setFlex($("#customBuyStreaming"));
        hide($("#ownStreaming"));
        $("#customBuyStreaming").children(".heading-5").last().html(formPriceString(getData($(":radio[name='streaming']:checked"), "price")));
        $("#customBuyStreaming").children(".heading-5").first().html($(":radio[name='streaming']:checked").siblings("span").html());
    } else {
        hide($("#customBuyStreaming"));
        setFlex($("#ownStreaming"));
    }

});
$(":radio[name='eventAppPackageTotal']").on("change", function () {
    $("#custom").prop("checked") ? setFlex($(".customexpcontainer")) : hide($(".customexpcontainer")),
        $("#brandedTotal").prop("checked") ? setFlex($(".brandedappcontainer")) : hide($(".brandedappcontainer"));
});

$("#addPackageBtn").on("click", function (e) {
    e.preventDefault(),
        $(".customize-modal").animate({
            opacity: 0
        }, 400, function () {
            $(".customize-modal").css("display", "none");
        }),
        setFlex($("#customizeOption")),
        $("#customizeOptionUpper").removeClass("bottom");
});


$("#rangeSlider").on("input", function (e) {
    let a = parseInt($(this).val()) / 100,
        t = "linear-gradient(90deg, #1a79ff " + a + "%, rgba(18, 36, 89, 0.1) " + a + "%)";
    $(this).siblings(".sliderValue").val($(this).val()), $(this).css("background", t);

    let price = getSliderPrice($("#rangeSlider"));
    $(".additionalregprice").html(formPriceString(price));
    $(".additionalcreditsamount").html(parseInt($(this).val()) - 500);
    sliderVal = price;
    $total.html(formPriceString(4000 + price + getData($(":radio[name='eventAppPackageTotal']:checked"), "price") + getData($streamingPackageRadios, "price")));
});

$("#rangeSlider")
    .siblings("input")
    .on("input", function () {
        $(this).val(this.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1")), getValue($(this)) > 1e4 ? $(this).val(1e4) : "" === $(this).val() && $(this).val(0), "0" === $(this).val()[0] && $(this).val(+$(this).val());

        let value = getValue($(this)),
            pricePerAttendee = 8;

        $(this).siblings("input").val($(this).val());
        $(this).siblings("input").css("background", handleGradient(value));

        if ((value >= 1000) && (value < 2000)) {
            pricePerAttendee = 7;
        } else if ((value >= 2000) && (value < 5000)) {
            pricePerAttendee = 6;
        } else if (value >= 5000) {
            pricePerAttendee = 5
        }
        if (value > 500) {
            setFlex($(".additionalregcreditscontainer"));
        } else {
            hide($(".additionalregcreditscontainer"));
        }
        let price = value > 500 ? (value - 500) * pricePerAttendee : 0;
        $(".additionalregprice").html(formPriceString(price));
        $(".additionalcreditsamount").html(value - 500);
        sliderVal = price;
        $total.html(formPriceString(4000 + price + getData($(":radio[name='eventAppPackageTotal']:checked"), "price") + getData($streamingPackageRadios, "price")));
    });

$(".rangeSlider").on("input", function (e) {
    let a = 5.264 * (getValue($(this)) - 1),
        t = "linear-gradient(90deg, #1a79ff " + a + "%, rgba(18, 36, 89, 0.1) " + a + "%)";
    $(this).siblings(".sliderValue").val($(this).val()), $(this).css("background", t);
    let i = 1999 * (getValue($(this)) - 1);
    if (i <= 0) {
        if ((hide($("#additionalEvents")), 0 == getData($eventAppPackageRadios, "price")))
            return $("#addPackageBtn").addClass("disabled"), $("#addPackageBtn").css("pointer-events", "none"), void $("#totalPackagePrice").html("$0");
    } else getValue($(this)) > 1 && ($("#addPackageBtn").removeClass("disabled"), setFlex($("#additionalEvents")), $("#addPackageBtn").css("pointer-events", ""), $("#additionalEventsValue").html(i / 1999), $("#additionalEventsPrice").html(formPriceString(i)));
    let n = i + getData($eventAppPackageRadios, "price");
    $("#custom").data("price", n), $(".customexppackageprice, #totalPackagePrice, #customPackagePrice").html(formPriceString(n));
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
            .css("background", "linear-gradient(90deg, #1a79ff " + 5.264 * (parseInt($(this).val()) - 1) + "%, rgba(18, 36, 89, 0.1) " + 5.264 * (getValue($(this)) - 1) + "%)");
        let a = 1999 * (getValue($(this)) - 1);
        if (a <= 0) {
            if ((hide($("#additionalEvents")), 0 == getData($eventAppPackageRadios, "price")))
                return $("#addPackageBtn").addClass("disabled"), $("#addPackageBtn").css("pointer-events", "none"), void $("#totalPackagePrice").html("$0");
        } else getValue($(this)) > 1 && ($("#addPackageBtn").removeClass("disabled"), setFlex($("#additionalEvents")), $("#addPackageBtn").css("pointer-events", ""), $("#additionalEventsValue").html(a / 1999), $("#additionalEventsPrice").html(formPriceString(a)));
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
    hide($(this));
    $(".number-of-credits-container").toggle(true);
    let value = parseFloat($("#engagementPrice").html().replace("$", "").replace(",", ""));
    $("#engagementPriceTotal").html(formPriceString(2 * value));
});

$(".numericContainer")
    .children("button")
    .on("click", function (e) {
        e.preventDefault();
        let price = parseFloat($("#engagementPrice").html().replace("$", "").replace(",", ""));
        let value = value($(this).siblings("input"));
        let btnAction = getData($(this), "increment");
        if ((value === 1) && (btnAction === -1)) {
            $(this).siblings("input").val(1);
        } else if ((value === 10) && (btnAction === 1)) {
            $(this).siblings("input").val(10);
        } else {
            $(this)
                .siblings("input")
                .val(value + btnAction);
        }
        $("#engagementPriceTotal").html(formPriceString(price * getValue($(this).siblings("input"))));
    });


//additional functions
function handleGradient(e) {
    return "linear-gradient(90deg, #1a79ff " + e / 100 + "%, rgba(18, 36, 89, 0.1) " + e / 100 + "%)";
}

function parseFloatFromString(e) {
    return 1e3 * e.html().replace(/,/, ".").slice(1, e.html().length);
}

function getData(obj, data) {
    return parseInt(obj.data(data));
}

function setFlex(obj) {
    return obj.css("display", "flex")
}

function hide(obj) {
    return obj.toggle(false);
}

function formPriceString(e) {
    return "$" + e.toLocaleString();
}

function getSliderPrice(obj) {
    let price = 0,
        pricePerAttendee = 8,
        value = getValue(obj);

    if ((value >= 1000) && (value < 2000)) {
        pricePerAttendee = 7;
    } else if ((value >= 2000) && (value < 5000)) {
        pricePerAttendee = 6;
    } else if (value >= 5000) {
        pricePerAttendee = 5
    }
    if (value > 500) {
        setFlex($(".additionalregcreditscontainer"));
    } else {
        hide($(".additionalregcreditscontainer"));
    }

    return value > 500 ? (value - 500) * pricePerAttendee : 0;
}

function getValue(obj) {
    return parseInt(obj.val());
}
