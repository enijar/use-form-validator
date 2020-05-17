define(["require", "exports", "react"], function (require, exports, react_1) {
  "use strict";
  exports.__esModule = true;
  exports.formatMessage = void 0;
  var RULE_SEP = "|";
  var ARG_SEP = ":";
  var MULTI_ARG_SEP = ",";
  var messagesMap = {
    required: "The :field field is required",
    min: "The :field field must have a min of :length characters",
    max: "The :field field must have a max of :length characters",
    email: "The :field field is not a valid email",
  };
  var validatorsMap = {
    required: function (value) {
      return {
        pass: value.length > 0,
        message: function (field) {
          return formatMessage(messagesMap.required, { field: field });
        },
      };
    },
    min: function (value, length) {
      return {
        pass: value.length >= length,
        message: function (field) {
          return formatMessage(messagesMap.min, {
            field: field,
            length: length,
          });
        },
      };
    },
    max: function (value, length) {
      return {
        pass: value.length <= length,
        message: function (field) {
          return formatMessage(messagesMap.max, {
            field: field,
            length: length,
          });
        },
      };
    },
    email: function (value) {
      return {
        pass: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
          value
        ),
        message: function (field) {
          return formatMessage(messagesMap.email, { field: field });
        },
      };
    },
  };
  function formatMessage(message, args) {
    if (args === void 0) {
      args = {};
    }
    var formattedMessage = message;
    for (var arg in args) {
      if (!args.hasOwnProperty(arg)) {
        continue;
      }
      formattedMessage = formattedMessage.replace(":" + arg, args[arg]);
    }
    return formattedMessage;
  }
  exports.formatMessage = formatMessage;
  function useValidators(rules) {
    var _a = react_1.useState({}),
      validators = _a[0],
      setValidators = _a[1];
    react_1.useEffect(
      function () {
        var validators = {};
        for (var field in rules) {
          if (!rules.hasOwnProperty(field)) {
            continue;
          }
          validators[field] = rules[field]
            .split(RULE_SEP)
            .map(function (ruleString) {
              var _a = ruleString.split(ARG_SEP),
                name = _a[0],
                _b = _a[1],
                args = _b === void 0 ? "" : _b;
              args = args.length === 0 ? [] : args.split(MULTI_ARG_SEP);
              var test = validatorsMap[name];
              return { name: name, args: args, test: test };
            });
        }
        setValidators(validators);
      },
      [rules]
    );
    return validators;
  }
  exports["default"] = useValidators;
});
