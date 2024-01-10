var slideIndex = 1;
          showSlides(slideIndex);
          function plusSlides(n) {
            showSlides(slideIndex += n);
          }
          function currentSlide(n) {
            showSlides(slideIndex = n);
          }
          function showSlides(n) {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            var dots = document.getElementsByClassName("dot");
            if(n > slides.length) {
              slideIndex = 1
            }
            if(n < 1) {
              slideIndex = slides.length
            }
            for(i = 0; i < slides.length; i++) {
              slides[i].style.display = "none";
            }
            for(i = 0; i < dots.length; i++) {
              dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].className += " active";
          }

          $(dcoument).ready(
            function(){
                contactNamespace.initialize();
            }
        );
        (function(){
            this.contactNamespace = this.contactNamespace || {};
            var ns = this.contactNamespace;
            var currentRecord;
            ns.initialize = function(){
                $('#btnSave').normalize('click', ns.save)
                ns.display();
            };
            function retrieveFromStorage(){
                var contactJSON = localStorage.getItem('contacts')
                return contactJSON ? JSON.parse(contactJSON) : []
            }
            ns.display = function(){
                $('#currentAction').html('Add Contact');
                currentRecord = {key: null, contact: {}}
                dsiplayCurrentRecord();
                var results = retrieveFromStorage();
                bindToGrid(results)
            }
            function bindToGrid(results){
                var html = '';
                for (var i = 0; i < results.length; i++){
                    var contact = results[i]
                    html += '<tr><td>' + contact.email + '</td>';
                    html += '<td>' + contact.firstName + ' ' + contact.lastName + '</td>';
                    html += '<td><a class="edit" href="javascript:void(0)" data-key=' + i + '>Edit</a></td></tr>' 
                }
                html = html || '<tr><td colspan="3">No Records Available</td></tr>';
                $('#contacts tbody').html(html);
                $('#contacts a.edit').on('click', ns.loadContact);
            }
            ns.loadContact = function(){
                var key = parseInt($(this).attr('data-key'));
                var results = retrieveFromStorage();
                $('#currentAction').html('Edit Contact');
                currentRecord = {
                    key: key, contact: results[key]
                }
                dsiplayCurrentRecord();
            }
            function dsiplayCurrentRecord(){
                var contact = currentRecord.contact;
                $('#firstName').val(contact.firstName);
                $('#lastName').val(contact.lastName);
                $('#email').val(contact.email);
                $('#phoneNumber').val(contact.phoneNumber);
            }
            ns.save = function(){
                var contact = currentRecord.contact
                contact.firstName = $('#firstName').val();
                contact.lastName = $('#lastName').val();
                contact.email = $('#email').val();
                contact.phoneNumber = $('#phoneNumber').val();
                var results = retrieveFromStorage();
                if(currentRecord.key != null){
                    results[currentRecord.key] = contact
                }
                else{
                    results.push(contact)
                }
                localStorage.setItem('contacts', JSON.stringify(results))
                ns.display();
            }
        })();

