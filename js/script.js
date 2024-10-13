$(document).ready(function() {
        let totalAmount = 0;
        let totalItems = 0;
    
        async function initState() {
            const response = await fetch('data.json');
            const data = await response.json();
            data.forEach(item => {
                let { name, category, price, image } = item;
                generateData(image.desktop, category, name, price);
            });
            setDataItemState();
        }
    
        function setDataItemState() {
            $(".addToCartDiv").on("click", setAddToCartState);
        }
    
        function setAddToCartState() {  
                let $imageDiv = $(this).closest('.dataItem').find('.imageDiv');
    
                // Ajout de la bordure rouge
                $imageDiv.css('border', 'solid 1px red'); 
                $(this).empty();
                $(this).addClass('no-hover');
            
    
                let $counter = $('<span>', {
                        text: '0',
                        class: 'item-count'
                });
    
                // minus-button
                let $minusButton = $('<button>', {
                        text: '-',
                        class: 'minus-button'
                }).on("click", function(e) {
                        e.stopPropagation();
                        updateCartCount($counter, -1, $(this).data('name'), $(this).data('price'));
                });
    
                // plus-button
                let $plusButton = $('<button>', {
                        text: '+',
                        class: 'plus-button'
                }).on("click", function(e) {
                        e.stopPropagation(); 
                        updateCartCount($counter, 1, $(this).data('name'), $(this).data('price'));
                });
    
                // Stocke le nom et le prix dans les boutons
                $minusButton.data('name', $(this).data('name'));
                $minusButton.data('price', $(this).data('price'));
                $plusButton.data('name', $(this).data('name'));
                $plusButton.data('price', $(this).data('price'));
    
                $(this).append($minusButton, $counter, $plusButton);
                $(this).css('background-color', 'hsl(14, 86%, 42%)');
                $(this).css('border', 'none');
                $(this).css('justify-content', 'space-around');
        }
        function updateCartCount($counter, increment, name, price) {
                        let currentValue = parseInt($counter.text());
                        let newValue = currentValue + increment;
                        if (newValue >= 0) {
                        $counter.text(newValue);
                        updateCart(name, price, newValue);
                }
        }
    
        function updateCart(name, price, quantity) {
                let $cartItems = $(".cartItems");
                let $item = $cartItems.find(`.cart-item[data-name="${name}"]`);
            
                if ($item.length > 0) {
                    if (quantity === 0) {
                        let itemQuantity = parseInt($item.find('.item-quantity').text());
                        totalAmount -= itemQuantity * price;
                        totalItems -= itemQuantity; // Retire le nombre d'articles choisis
                        $item.remove();
                    } else {
                        let itemQuantity = parseInt($item.find('.item-quantity').text());
                        totalItems += (quantity - itemQuantity);
                        totalAmount += (quantity - itemQuantity) * price;
                        $item.find('.item-quantity').text(quantity);
                    }
                } else if (quantity > 0) {
                    let itemTotal = price * quantity;
                    totalAmount += itemTotal;
                    totalItems += quantity; // Ajoute au nombre d'articles choisis
            
                    // create suppression button
                    let $removeButton = $('<button>', {
                        text: '✖',
                        class: 'remove-button'
                    })

                $(".cartItems").on("click", ".remove-button", function() {
                        // let itemQuantity = parseInt($item.find('.item-quantity').text());
                        // totalAmount -= itemQuantity * price;
                        // totalItems -= itemQuantity; 
                        $item.remove();
                        updateTotal();
                        
                });
                    
            
                    // adding cart Items
                $cartItems.append(`
                        <br>
                        <div class="cart-item" style="font-size: 12px" data-name="${name}">
                                <span>${name}</span><br>
                                <span class="item-quantity" style="color: hsl(14, 86%, 42%)">${quantity}</span>
                                <span style="color: hsl(14, 86%, 42%)">x</span>
                                <span style="margin-left: 10px;">$${price.toFixed(2)}</span>
                                <span style="margin-left: 10px;">$${(price * quantity).toFixed(2)}</span>
                                <span style="margin-left: 10px;">${$removeButton.prop('outerHTML')}</span> 
                                <hr style='margin-top: 10px'>
                        </div>
                    `);
                }
            
                updateTotal();
            
                // management to show or hide empty-cart-svg/totalPrice/confirmOrder
                if (totalItems > 0) {
                    $(".empty-cart-svg").hide(); 
                    $(".totalPrice p").show(); 
                    $(".itemsEmpty").hide();
                    $(".confirmOrder").show();
                } else {
                    $(".empty-cart-svg").show(); 
                    $(".totalPrice p").hide(); 
                    $(".itemsEmpty").show();
                    $(".confirmOrder").hide();
                }
            }
            
            
    
        function updateTotal() {
               
                $("#totalAmount").text(`$${totalAmount.toFixed(2)}`);
                $("#cartTitle").text(`Your cart (${totalItems})`); // update dart title
            
                // Show or hide the SVG based on cart items
                if (totalItems === 0) {
                        $(".empty-cart-svg").show();
                        $(".cartItems").hide();
                } else {
                        $(".empty-cart-svg").hide();
                        $(".cartItems").show();
                }
            }
            
    
        function generateData(desktop, category, name, price) {
                let $dataContainer = $(".dataContainer");
        
                let $dataDiv = $('<div>', {
                        class: "dataDiv"
                });
    
                let $dataItem = $('<div>', {
                        class: "dataItem"
                });
                let $imageDiv = $('<div>', {
                        class: "imageDiv"
                });
                let $img = $('<img>', {
                        class: "image",
                        alt: "image",
                        src: `${desktop}`
                });
    
                let $addToCartDiv = $('<div>', {
                        class: "addToCartDiv"
                });
                let $addToCartImg = $('<img>', {
                        class: "addToCartImg",
                        src: "./assets/images/icon-add-to-cart.svg"
                });
                let $addToCartText = $('<span>', {
                        class: "addToCartText",
                        text: "add to cart"
                });
        
                let $category = $('<p>', {
                        class: "category",
                        text: `${category}`
                });
                let $name = $('<p>', {
                        class: "name",
                        text: `${name}`
                });
                let $price = $('<p>', {
                        class: "price",
                        text: `$${price.toFixed(2)}`
                });
    
                // adding data to addToCartDiv
                $addToCartDiv.data('name', name);
                $addToCartDiv.data('price', price);
        
                /************Making the grid structure*************/
                $imageDiv.append($img);
                $dataItem.append($imageDiv, $addToCartDiv);
                $addToCartDiv.append($addToCartImg, $addToCartText);
                $dataDiv.append($dataItem, $category, $name, $price);
        
                $dataContainer.append($dataDiv);
        }
        function showOrderPopup() {
                const $orderItems = $(".order-items");
                $orderItems.empty(); // Clear previous items
                let orderTotal = 0;
        
                $(".cartItems .cart-item").each(function() {
                    const name = $(this).data("name");
                    const quantity = $(this).find('.item-quantity').text();
                    const price = parseFloat($(this).find('.item-quantity').next().next().text().slice(1)); // Extract price from the DOM
                    const itemTotal = price * quantity;
        
                    orderTotal += itemTotal;
        
                    $orderItems.append(`
                        <div>${name} (x${quantity}): $${itemTotal.toFixed(2)}</div>
                    `);
                });
        
                $("#popupTotalAmount").text(`$${orderTotal.toFixed(2)}`);
                $("#orderPopup").show(); // Show the popup
            }
        
            // Add click event for the "Confirm Order" button
            $(".confirmOrder button").on("click", function() {
                showOrderPopup();
            });
        
            // Close popup functionality
            $("#closePopup").on("click", function() {
                $("#orderPopup").hide(); // Hide the popup
            });

            $('.start-new-order').on('click', function() {
                // Réinitialisez les variables globales
                totalAmount = 0;
                totalItems = 0;
            
                // Réinitialisez le contenu du panier
                $(".cartItems").empty();
                $(".totalPrice p").hide();
                $(".empty-cart-svg").show();
                $(".itemsEmpty").show();
                $(".confirmOrder").hide();
            
                // Réinitialisez l'affichage du titre du panier
                $("#cartTitle").text(`Your cart (0)`);
            
                // Réinitialisez les articles pour montrer le bouton "Add to Cart"
                $(".dataItem").each(function() {
                        let $addToCartDiv = $(this).find('.addToCartDiv');
                        $addToCartDiv.empty(); // Vider le contenu
                        $addToCartDiv.css({
                                'background-color': '',
                                'border': '',
                                'justify-content': ''
                        }); // Réinitialiser le style
                
                        let $addToCartImg = $('<img>', {
                                class: "addToCartImg",
                                src: "./assets/images/icon-add-to-cart.svg"
                        });
                        let $addToCartText = $('<span>', {
                                class: "addToCartText",
                                text: "add to cart"
                        });
                
                        $addToCartDiv.append($addToCartImg, $addToCartText); // Réajouter le contenu de "Add to Cart"
                        $addToCartDiv.removeClass('no-hover'); // Supprimer la classe no-hover
                        // Réinitialiser la bordure rouge
                        $(this).find('.imageDiv').css('border', ''); 
                });
            
                // Fermer la popup si elle est ouverte
                $("#orderPopup").hide(); 
            });
            
        initState();
});
    