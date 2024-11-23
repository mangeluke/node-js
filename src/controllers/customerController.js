const controller = {}; // Crear el objeto del controlador

// Mostrar la lista de clientes
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Error al conectar con la base de datos');
        }

        conn.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                return res.status(500).json(err); // Si hay errores, devolverlos
            }
            res.render('customers', { data: customers }); // Enviar los datos a la vista
        });
    });
};

// Guardar un nuevo cliente
controller.save = (req, res) => {
    const data = req.body; // Obtener los datos del formulario
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Error al conectar con la base de datos');
        }

        conn.query('INSERT INTO customer SET ?', [data], (err, customer) => {
            if (err) {
                return res.status(500).json(err); // Si hay errores, devolverlos
            }
            res.redirect('/'); // Redirigir a la página de inicio después de guardar el cliente
        });
    });
};

// Mostrar el formulario de edición con los datos del cliente
controller.showEditForm = (req, res) => {
    const { Id } = req.params; // Obtener el ID del cliente de la URL
    
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Error al conectar con la base de datos');
        }

        conn.query('SELECT * FROM customer WHERE Id = ?', [Id], (err, customer) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (customer.length > 0) {
                res.render('partials/editCustomer', { customer: customer[0] }); // Mostrar el formulario con los datos del cliente
            } else {
                res.status(404).send('Cliente no encontrado');
            }
        });
    });
};

controller.edit = (req, res) => {
    const { Id } = req.params; // Recibe el parámetro id de la URL
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Error de conexión');
        }

        conn.query('SELECT * FROM customer WHERE Id = ?', [Id], (err, customers) => {
            if (err) {
                return res.status(500).send('Error en la consulta');
            }
            if (customers.length > 0) {
                // Cambié 'customers_edit' por 'partials/customers_edit' para reflejar la ruta correcta
                res.render('partials/customers_edit', { data: customers[0] }); // Redirige a la página de edición
            } else {
                res.status(404).send('Cliente no encontrado');
            }
        });
    });
};


controller.update=((req,res)=>{
    const {Id}=req.params; //recibe un parametro de la url
    const newCustomer=req.body;
    req.getConnection((err,conn)=>{
        conn.query('UPDATE  customer set ? WHERE Id=?',[newCustomer,Id],(err,rows)=>{
         res.redirect('/');   
        })
    })
})



// Lógica para eliminar un cliente de la base de datos
controller.delete = (req, res) => {
    const { Id } = req.params; // Obtener el ID del cliente de la URL
    
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Error al conectar con la base de datos');
        }

        const sql = 'DELETE FROM customer WHERE Id = ?';
        conn.query(sql, [Id], (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/'); // Redirige de vuelta a la página principal después de eliminar
        });
    });
};

// Exporta el objeto del controlador
module.exports = controller;

