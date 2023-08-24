loadData();
$("#AddNew").click(() => {
  $("#studentModal").modal("show");
});

let btnAction = "Insert";

$("#studentForm").submit(function (e) {
  e.preventDefault();

  let form_data = new FormData($("#studentForm")[0]);

  if (btnAction == "Insert") {
    form_data.append("action", "registerStudent");
  } else {
    form_data.append("action", "updateStudent");
  }
  $.ajax({
    method: "POST",
    dataType: "json",
    url: "api.php",
    data: form_data,
    processData: false,
    contentType: false,
    success: function (data) {
      let success = data.success;
      let response = data.data;

      $("#studentForm")[0].reset();

      btnAction = "Insert";
      $("#studentModal").modal("hide");
      loadData();
    },
    error: function (data) {
      console.log(data);
    },
  });

  loadData();
});

function loadData() {
  $("#studentTable tbody").html("");
  let sendingData = {
    action: "readAll",
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      let html = "";
      let tr = "";
      if (status) {
        response.forEach((item) => {
          tr += "<tr>";
          for (let i in item) {
            tr += `<td>${item[i]}</td>`;
            // console.log(item[i]);
          }
          tr += `<td><a class="btn btn-primary update_info" update_id=${item["id"]}><i class="fa-solid fa-edit"></i></a>&nbsp;<a class="btn btn-danger delete_info" delete_id=${item["id"]}><i class='fa-solid fa-trash'></i></a></td>`;

          tr += "</tr>";
        });

        $("#studentTable tbody").append(tr);
      }
    },
    error: function (data) {},
  });
}

function fetchStudentInfo(id) {
  let sendingData = {
    action: "readStudentInfo",
    id: id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      let html = "";
      let tr = "";
      if (status) {
        $("#id").val(response[0].id);
        $("#name").val(response[0].name);
        $("#class").val(response[0].class);
        $("#studentModal").modal("show");
        btnAction = "Update";
      }
    },
    error: function (data) {},
  });
}

function deleteStudent(id) {
  let sendingData = {
    action: "deleteStudent",
    id: id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      let html = "";
      let tr = "";
      if (status) {
        confirm("Are you sure you want to Delete this");
        loadData();
      }
    },
    error: function (data) {},
  });
}

$("#studentTable").on("click", "a.update_info", function () {
  // console.log("Update info");

  let id = $(this).attr("update_id");
  console.log(id);
  fetchStudentInfo(id);
});

$("#studentTable").on("click", "a.delete_info", function () {
  let id = $(this).attr("delete_id");
  deleteStudent(id);
});
