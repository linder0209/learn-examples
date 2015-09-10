$(function () {
  'use strict';
  //标签数值实体
  var labels = {
    init: function () {
      this.events();
    },

    events: function () {
      var self = this;
      //添加新的标签
      $('#addLabel').click(function () {
        self.addOrUpdateLabel();
      });

      //修改标签
      $('#customerLabelsList').on('click', '.updateLabel', function (e) {
        e.preventDefault();
        $('#customLabelModal').modal();
        var id = $(this).data('id');
        self.updateItem(id);
      });

      //删除标签
      $('#customerLabelsList').on('click', 'a.deleteLabel', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        self.deleteItem(id);
      });
    },

    addOrUpdateLabel: function (data) {
      var customLabelModalTmpl = $('#customLabelModalTmpl').html();
      var customLabelModal = $(customLabelModalTmpl).appendTo(document.body);
      customLabelModal.modal();
      customLabelModal.on('hidden.bs.modal', function (e) {
        customLabelModal.remove();
      });
      //标签数值实体
      var CustomLabelPro = function (customLabelProId, customLableProValue) {
        this.customLabelProId = ko.observable(customLabelProId);
        this.customLableProValue = ko.observable(customLableProValue);
      };

      //标签实体
      var CustomLabel = function (customLableId, customLabelName, customLabelPros) {
        this.customLableId = ko.observable(customLableId);
        this.customLabelName = ko.observable(customLabelName);
        this.customLabelPros = ko.observableArray(customLabelPros);
        this.checked = ko.observable(false);
      };

      var ViewModel = function () {
        var customLabel;
        if (data) {
          var customLabelPro;
          var customLabelPros = [];
          data.labelProList.forEach(function (item) {
            customLabelPro = new CustomLabelPro(item.customLabelProId, item.customLableProValue);
            customLabelPros.push(customLabelPro);
          });
          customLabel = new CustomLabel(data.customLableId, data.customLabelName, customLabelPros);
        } else {
          customLabel = new CustomLabel(null, '', [new CustomLabelPro(null, '')]);
        }

        this.customLabel = customLabel;

        this.showlabelForm = ko.observable(true);
        this.showLabelsContainer = ko.observable(false);
        this.modalTitle = ko.observable(data ? '编辑标签' : '添加标签');

        //待选择标签集合
        this.labels = ko.observableArray([]);

        //引用标签
        this.quoteLabel = function () {
          this.showlabelForm(false);
          this.showLabelsContainer(true);
          this.labels.removeAll();
          var self = this;
          $.ajax({
            type: 'get',
            url: './json/object_array/quoteLabel.json',//开发环境请替换该url
            dataType: 'json',
            data: {},
            success: function (result) {
              if (result.success) {
                console.info(result.data);
                result.data.forEach(function (item) {
                  var labelProList = [];
                  item.labelProList.forEach(function (it) {
                    labelProList.push(new CustomLabelPro(it.customLabelProId, it.customLableProValue));
                  });
                  self.labels.push(
                    new CustomLabel(item.customLableId, item.customLabelName, labelProList)
                  );
                });
              }
            }
          });
        };


        this.quoteConfirmClick = function () {
          this.showlabelForm(true);
          this.showLabelsContainer(false);
          var _label;
          this.labels().forEach(function (label) {
            if (label.checked()) {
              _label = label;
            }
          });

          this.customLabel.customLableId = ko.observable(_label.customLableId());
          this.customLabel.customLabelName = ko.observable(_label.customLabelName());
          this.customLabel.customLabelPros.removeAll();
          //this.customLabel.customLabelPros = _label.customLabelPros;
          _label.customLabelPros.forEach(function (item) {
            this.customLabel.customLabelPros.push(
              new CustomLabelPro(item.customLabelProId(), item.customLableProValue())
            );
          });
        };


        this.selectLabel = function (data, event) {
          data.checked(!!event.target.checked);
        };

        //添加标签值
        this.addLabelValue = function (data, event) {
          this.customLabel.customLabelPros.push(new CustomLabelPro(null, ''));
        }.bind(this);

        this.deleteLabelValue = function (data, event) {
          this.customLabel.customLabelPros.remove(data);
        }.bind(this);

        //提交
        this.submitData = function () {
          var data = this.customLabel();
          $.ajax({
            url: '/customer/saveCustomerLabel',
            type: 'post',
            data: {data: JSON.stringify(data)},
            dataType: 'json',
            success: function (result) {
              if (result.success) {
              } else {
              }
            }
          });
        };
      };

      ko.applyBindings(new ViewModel(),customLabelModal[0]);

    },


    /**
     * 修改标签
     * @param id
     */
    updateItem: function (id) {
      var self = this;
      $.ajax({
        type: 'get',
        url: './json/object_array/updateLabel.json',//开发环境请替换该url
        dataType: 'json',
        data: {},
        success: function (result) {
          if (result.success) {
            self.addOrUpdateLabel(result.data);
          } else {
            console.info('error');
          }
        }
      });
    },

    deleteItem: function (id) {
      $.ajax({
        type: 'delete',
        url: '/customer/labels/' + id,
        dataType: 'json',
        data: {},
        success: function (result) {
        }
      });
    }
  };

  labels.init();
});