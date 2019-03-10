/**
 * Created by Anna on 10.03.2019.
 */

console.log("Hello");

$(function () {

    function updateNode(node, fn) {
        node.fadeOut(250, function () {
            fn();
            node.fadeIn(250);
        });
    }

    // variables from column one
    var $LIST = $('.shop-list');
    var $ITEM_TEMPLATE = $('.row-template').html();
    var $addButton = $(".add-button");
    var $input = $(".add-item");

    //variables from column two
    var $NOT_BOUGHT = $('.elements-not-bought');
    var $STATUS_TEMPLATE = $('.bought-items-template').html();
    var $BOUGHT = $('.bought-items');

    console.log("Template:" + $ITEM_TEMPLATE);
    console.log("add-button:", $addButton);
    console.log("input:", $input);

    function addItem(title) {
        var $node = $($ITEM_TEMPLATE);
        var quantity = 1;
        var $quantityLabel = $node.find(".count");

        var $status = $($STATUS_TEMPLATE);
        var $alreadyBought = $node.find(".already-bought");
        var $notBought = $node.find(".not-bought");
        var $unbuyButton = $node.find(".unbuy-button");
        var $buyButton = $node.find(".buy-button");
        var $deleteButton = $node.find(".delete-button");
        var $productTitle = $status.find(".title");
        var $leftCount = $status.find(".left-count");
        var $minusButton = $node.find(".minus-button");
        var $plusButton = $node.find(".plus-button");

        // "DELETE-BUTTON"
        $deleteButton.click(function () {
            $node.slideUp();
            // $node.remove();
            $status.remove();
        });

        // "MINUS-BUTTON"
        $minusButton.click(function () {
            console.log("Quantity", quantity);
            if (quantity == 2)
                $minusButton.addClass("disabled");
            if (quantity > 1) {
                quantity--;
                $quantityLabel.text(quantity);
                $leftCount.text(quantity);
            }

        });

        // "PLUS-BUTTON"
        $plusButton.click(function () {
            quantity++;
            if (quantity > 1)
                $minusButton.removeClass("disabled");
            $quantityLabel.text(quantity);
            $leftCount.text(quantity);
        });

        // "BUY-BUTTON"
        function buyClick() {
            $notBought.addClass("hidden");
            $alreadyBought.removeClass("hidden");
            $buyButton.addClass("hidden");
            $deleteButton.addClass("hidden");
            $unbuyButton.removeClass("hidden");
            $minusButton.addClass("hidden");
            $plusButton.addClass("hidden");
            $alreadyBought.text(title);
            $BOUGHT.append($status);
        }

        $buyButton.click(function () {
            updateNode($node, buyClick);
        });

        // "UNBUY-BUTTON"
        function unbuyClick() {
            $alreadyBought.addClass("hidden");
            $notBought.removeClass("hidden");
            $buyButton.removeClass("hidden");
            $deleteButton.removeClass("hidden");
            $unbuyButton.addClass("hidden");
            $minusButton.removeClass("hidden");
            $plusButton.removeClass("hidden");
            $plusButton.css("display", "inline-block");
            $status.remove();
            $NOT_BOUGHT.append($status);
        }

        $unbuyButton.click(function () {
            updateNode($node, unbuyClick);
        });

        // "NAME-EDIT"
        var $nameEdit = $node.find(".name-edit");
        $notBought.click(function () {
            $notBought.addClass("hidden");
            $nameEdit.removeClass("hidden");
            $nameEdit.val(title);
            $nameEdit.focus();
            // newName = $nameEdit.val();
        });

        function newName() {
            console.warn("New nam");
            var updatedName = $nameEdit.val();
            console.log("New name", updatedName);
            $nameEdit.addClass("hidden");
            $notBought.removeClass("hidden");
            $notBought.text(updatedName);
            title = updatedName;
            $productTitle.text(updatedName);
            $nameEdit.val(updatedName);
        }

        $nameEdit.keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                console.log("Enter was pressed");
                newName();
            }
        });

        console.log("Name edit", $nameEdit);
        $nameEdit.focusout(newName);

        $notBought.text(title);

        $quantityLabel.text(quantity);
        //console.log("Name", $notBought.text(title));
        //console.log("Quantity-label", quantity);

        $productTitle.text(title);
        $leftCount.text(quantity);

        $NOT_BOUGHT.append($status);
        $LIST.append($node); //Add to the end of the list

    }

    addItem("Помідори");
    addItem("Печиво");
    addItem("Сир");

    function addNewItem() {
        var item_name = $input.val();
        console.log(item_name);
        if (item_name.trim()) {
            addItem(item_name);
        }
        $input.val("");
        $input.focus();
    }

    //When you click "ENTER", new item appears on the list
    $input.keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            console.log("Enter was pressed");
            addNewItem();
        }
    });

    //When you click on button "ADD", new item appears on the list
    $addButton.click(addNewItem);

    $input.attr("placeholder", "Назва товару");


});
