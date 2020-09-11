jQuery(document).ready(function($) {

    let pathname = window.location.pathname;
    let sep = pathname.lastIndexOf('/');
    // get product id
    let id = pathname.slice(sep + 1, pathname.length + 1);

    $("#cmt-sm").on('click', function(event) {
        event.preventDefault();

        let username = $("#cmt-name").val();

        let content = $("#cmt-txt").val();
        if (content.length === 0) {
            alert('Please don\'t let your comment be empty');
            return;
        }
        if (username.length === 0) {
            alert('Please don\'t let your name be empty')
            return
        }

        let date = new Date();
        var formData = {      
            'username': username,     
            'content': content,
            'date': date
        };
        
        $.ajax({
            type: 'post',
            url: '/comment/' + id,
            data: formData
        })
        .done(function(data) {
            // insert comment at the beginning of comment list
            $(".cmt-list").prepend('\
            <p style="font-size: 15px; font-weight: bold;">' + formData.username + '</p>\
            <p style="font-size: 13px; color: #9b9b9b;">' + formData.date.getDate() + '/' + (formData.date.getMonth() + 1) + '/' + formData.date.getFullYear() + ' ' + formData.date.getHours() + ':' + formData.date.getMinutes() + '</p>\
            <p style="font-size: 14px">' + formData.content + '</p>\
            <hr>\
            ');

            console.log('done');
        })
        .fail(function(data) {
            console.log('fail');
        });
    });

    $(".page-link").on('click', function(event) {
        event.preventDefault();

        let page_num = $(this).text();
        $.ajax({
            type: 'get',
            url: '/comment/' + id + '/' + page_num,
            dataType: 'html'
        })
        .done(function(data) {
            $(".cmt-list").html(data);
            console.log('done');
        })
        .fail(function(data) {
            console.log('fail');
        });
    });
    $("#truoc_webcam_load").on('click', function() {
        $("#truoc_block-img").addClass("fixed-popup");
        $(".shadow-cover").show();
        $("#truoc_block-webcam").show();
        $("#truoc_kq").hide();
        Webcam.attach("#truoc_show");
      });
    var window_width = window.screen.width;
  console.log("window_width = " + window_width);
  if (window_width <= 767) {
    // Mobile
    console.log("Mobile mode");

    var cam_width = 360;
    var cam_height = 640;
    var userAgent = window.navigator.userAgent;
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
      cam_width = 300;
      cam_height = 400;
    }

    Webcam.set({
      width: cam_width,
      height: cam_height,
      dest_width: cam_width,
      dest_height: cam_height,
      image_format: "jpeg",
      jpeg_quality: 60,
      force_flash: false,
      flip_horiz: true,
      fps: 45,
    });
  } else {
    console.log("Desktop mode");
    Webcam.set({
      width: 320,
      height: 240,
      dest_width: 640,
      dest_height: 480,
      image_format: "jpeg",
      jpeg_quality: 60,
      force_flash: false,
      flip_horiz: true,
      fps: 45,
    });
  }

  //capture truoc
  $("#truoc_close").on("click", function () {
    $("#truoc_block-webcam").hide();
    Webcam.reset();
    $("#truoc_block-img").removeClass("fixed-popup");
    $(".shadow-cover").hide();
    $("#truoc_kq").show();
  });
  $("#truoc_capture").on("click", function () {
    $("#truoc_upload-input").val("");
    Webcam.snap(function (data_uri) {
      $("#truoc_kq").html('<img src="' + data_uri + '"/>');
      $("#truoc_input").val(data_uri);
      $("#truoc_block-webcam").hide();
      Webcam.reset();
      $("#truoc_block-img").removeClass("fixed-popup");
      $(".shadow-cover").hide();
      $("#truoc_kq").show();
    });
  });

  //upload truoc
  $("#truoc_upload-input").on("change", readFileTruoc);
  $("#truoc_upload").on("click", function () {
    $("#truoc_block-webcam").hide();
    $("#truoc_upload-input").click();
  });

  //capture duoi
  $("#duoi_webcam_load").on("click", function () {
    $("#duoi_block-img").addClass("fixed-popup");
    $(".shadow-cover").show();
    $("#duoi_block-webcam").show();
    $("#duoi_kq").hide();
    Webcam.attach("#duoi_show");
  });
  $("#duoi_close").on("click", function () {
    $("#duoi_block-webcam").hide();
    Webcam.reset();
    $("#duoi_block-img").removeClass("fixed-popup");
    $(".shadow-cover").hide();
    $("#duoi_kq").show();
  });
  $("#duoi_capture").on("click", function () {
    $("#duoi_upload-input").val("");
    Webcam.snap(function (data_uri) {
      $("#duoi_kq").html('<img src="' + data_uri + '"/>');
      $("#duoi_input").val(data_uri);
      $("#duoi_block-webcam").hide();
      Webcam.reset();
      $("#duoi_block-img").removeClass("fixed-popup");
      $(".shadow-cover").hide();
      $("#duoi_kq").show();
    });
  });

  //upload duoi
  $("#duoi_upload-input").on("change", readFileDuoi);
  $("#duoi_upload").on("click", function () {
    $("#duoi_block-webcam").hide();
    $("#duoi_upload-input").click();
  });

  //capture tren
  $("#tren_webcam_load").on("click", function () {
    $("#tren_block-img").addClass("fixed-popup");
    $(".shadow-cover").show();
    $("#tren_block-webcam").show();
    $("#tren_kq").hide();
    Webcam.attach("#tren_show");
  });
  $("#tren_close").on("click", function () {
    $("#tren_block-webcam").hide();
    Webcam.reset();
    $("#tren_block-img").removeClass("fixed-popup");
    $(".shadow-cover").hide();
    $("#tren_kq").show();
  });
  $("#tren_capture").on("click", function () {
    $("#tren_upload-input").val("");
    Webcam.snap(function (data_uri) {
      $("#tren_kq").html('<img src="' + data_uri + '"/>');
      $("#tren_input").val(data_uri);
      $("#tren_block-webcam").hide();
      Webcam.reset();
      $("#tren_block-img").removeClass("fixed-popup");
      $(".shadow-cover").hide();
      $("#tren_kq").show();
    });
  });

  //upload tren
  $("#tren_upload-input").on("change", readFileTren);
  $("#tren_upload").on("click", function () {
    $("#tren_block-webcam").hide();
    $("#tren_upload-input").click();
  });

  //capture trai
  $("#trai_webcam_load").on("click", function () {
    $("#trai_block-img").addClass("fixed-popup");
    $(".shadow-cover").show();
    $("#trai_block-webcam").show();
    $("#trai_kq").hide();
    Webcam.attach("#trai_show");
  });
  $("#trai_close").on("click", function () {
    $("#trai_block-webcam").hide();
    Webcam.reset();
    $("#trai_block-img").removeClass("fixed-popup");
    $(".shadow-cover").hide();
    $("#trai_kq").show();
  });
  $("#trai_capture").on("click", function () {
    $("#trai_upload-input").val("");
    Webcam.snap(function (data_uri) {
      $("#trai_kq").html('<img src="' + data_uri + '"/>');
      $("#trai_input").val(data_uri);
      $("#trai_block-webcam").hide();
      Webcam.reset();
      $("#trai_block-img").removeClass("fixed-popup");
      $(".shadow-cover").hide();
      $("#trai_kq").show();
    });
  });

  //upload trai
  $("#trai_upload-input").on("change", readFileTrai);
  $("#trai_upload").on("click", function () {
    $("#trai_block-webcam").hide();
    $("#trai_upload-input").click();
  });

  //capture phai
  $("#phai_webcam_load").on("click", function () {
    $("#phai_block-img").addClass("fixed-popup");
    $(".shadow-cover").show();
    $("#phai_block-webcam").show();
    $("#phai_kq").hide();
    Webcam.attach("#phai_show");
  });
  $("#phai_close").on("click", function () {
    $("#phai_block-webcam").hide();
    Webcam.reset();
    $("#phai_block-img").removeClass("fixed-popup");
    $(".shadow-cover").hide();
    $("#phai_kq").show();
  });
  $("#phai_capture").on("click", function () {
    $("#phai_upload-input").val("");
    Webcam.snap(function (data_uri) {
      $("#phai_kq").html('<img src="' + data_uri + '"/>');
      $("#phai_input").val(data_uri);
      $("#phai_block-webcam").hide();
      Webcam.reset();
      $("#phai_block-img").removeClass("fixed-popup");
      $(".shadow-cover").hide();
      $("#phai_kq").show();
    });
  });

  //upload phai
  $("#phai_upload-input").on("change", readFilePhai);
  $("#phai_upload").on("click", function () {
    $("#phai_block-webcam").hide();
    $("#phai_upload-input").click();
  });

  function readFileTruoc() {
    if (this.files && this.files[0]) {
      var FR = new FileReader();
      FR.addEventListener("load", function (e) {
        $("#truoc_kq").html('<img src="' + e.target.result + '"/>');
        $("#truoc_input").val(e.target.result);
      });
      FR.readAsDataURL(this.files[0]);
    }
  }
  function readFileDuoi() {
    if (this.files && this.files[0]) {
      var FR = new FileReader();
      FR.addEventListener("load", function (e) {
        $("#duoi_kq").html('<img src="' + e.target.result + '"/>');
        $("#duoi_input").val(e.target.result);
      });
      FR.readAsDataURL(this.files[0]);
    }
  }
  function readFileTren() {
    if (this.files && this.files[0]) {
      var FR = new FileReader();
      FR.addEventListener("load", function (e) {
        $("#tren_kq").html('<img src="' + e.target.result + '"/>');
        $("#tren_input").val(e.target.result);
      });
      FR.readAsDataURL(this.files[0]);
    }
  }
  function readFileTrai() {
    if (this.files && this.files[0]) {
      var FR = new FileReader();
      FR.addEventListener("load", function (e) {
        $("#trai_kq").html('<img src="' + e.target.result + '"/>');
        $("#trai_input").val(e.target.result);
      });
      FR.readAsDataURL(this.files[0]);
    }
  }
  function readFilePhai() {
    if (this.files && this.files[0]) {
      var FR = new FileReader();
      FR.addEventListener("load", function (e) {
        $("#phai_kq").html('<img src="' + e.target.result + '"/>');
        $("#phai_input").val(e.target.result);
      });
      FR.readAsDataURL(this.files[0]);
    }
  }
});