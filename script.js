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
            
                    // Crée le bouton de suppression
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
                    
            
                    // Ajoute le bouton de suppression à l'élément de cart
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
            
                // Gère l'affichage du SVG et du montant total
                if (totalItems > 0) {
                    $(".empty-cart-svg").hide(); // Cache le SVG
                    $(".totalPrice p").show(); // Affiche le montant total
                    $(".itemsEmpty").hide();
                    $(".confirmOrder").show();
                } else {
                    $(".empty-cart-svg").show(); // Affiche le SVG
                    $(".totalPrice p").hide(); // Cache le montant total
                    $(".itemsEmpty").show();
                    $(".confirmOrder").hide();
                }
            }
            
            
    
        function updateTotal() {
               
                $("#totalAmount").text(`$${totalAmount.toFixed(2)}`);
                $("#cartTitle").text(`Your cart (${totalItems})`); // Met à jour le titre du panier
            
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
    
                // Ajouter des données au addToCartDiv
                $addToCartDiv.data('name', name);
                $addToCartDiv.data('price', price);
        
                /************Making the grid structure*************/
                $imageDiv.append($img);
                $dataItem.append($imageDiv, $addToCartDiv);
                $addToCartDiv.append($addToCartImg, $addToCartText);
                $dataDiv.append($dataItem, $category, $name, $price);
        
                $dataContainer.append($dataDiv);
        }
    
        initState();
});
    