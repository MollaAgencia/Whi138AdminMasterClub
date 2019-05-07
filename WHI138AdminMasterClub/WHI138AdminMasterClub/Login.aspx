<%@ Page Title="" Language="C#" MasterPageFile="~/Login.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="WHI138AdminMasterClub.Login1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="conteudo" runat="server">
    <div class="container match-height valign-center">
        <div class="row">
            <div class="col-md-12">
                <div class="featured-boxes">
                    <div class="row valignCenter">
                        <div class="col-md-6 col-md-offset-3 appear-animation" data-appear-animation="bounceIn" data-appear-animation-delay="800" data-appear-animation-duration="1s" alt="">
                            <!-- CPF -->
                            <img src="Imagens/logo/WHI138-logo-branco.svg" style="width: 100px;"/>
                            <img src="Imagens/logo/WHI138-logo-master.svg" style="width: 170px;"/>
                            <div class="featured-box featured-box-primary align-left mt-xlg" id="cpf">
                                <div class="box-content">
                                    <div id="formEnviar">
                                        <div class="row">
                                            <p class="text-center">Acesso <strong>Administrativo</strong></p>
                                            <div class="form-group">
                                                <div class="col-md-12 cpfBox">
                                                    <label>
                                                        CPF
                                                    </label>
                                                    <input type="text" data-input="input" name="LoginAdmin" id="LoginAdmin" tabindex="1" value="" data-mask="000.000.000-00" class="form-control input-lg" autofocus="autofocus" autocomplete="off">
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="alert alert-danger mess_erro_cpf" hidden="" id="alertError"></div>
                                                    <div class="alert alert-danger mess_erro_login" hidden="" id="alertError"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="form-group">
                                                <div class="col-md-12">
                                                    </a>
                                                    <label>
                                                        Senha
                                                    </label>
                                                    <input type="password" name="senhaAdmin" id="senhaAdmin" value="" class="form-control input-lg" tabindex="2" autocomplete="off">
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="alert alert-danger mess_erro_senha" hidden="" id="alertError"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <br />
                                            <div class="col-md-12 text-right">
                                                <asp:Button ID="Button1" runat="server" Text="Acessar" CssClass="btn btn-primary btn-sm" />
                                            </div>
                                        </div>
                                        <div class="row" id="alertInvalidLogin" runat="server">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script>
        $(document).ready(function () {
            $('#defaultModal').modal('show');
        });

        $('#Button1').click(function (e) {
            e.preventDefault();
            if (validaForm($('#form1'))) {
                $('#Button1').addClass('hide').after('<i class="fa fa-spinner fa-spin"></i>Aguarde, entrando...');
                $('#form1').submit();
            }
        });

        $('input[type=password],input[type=text]').on('keydown', function (e) {
            if (e.which == 13) {
                e.preventDefault();
                if (validaForm($('#form1'))) {
                    $('#Button1').addClass('hide').after('<i class="fa fa-spinner fa-spin"></i>Aguarde, entrando...');
                    $('#form1').submit();
                }
            }
        });
    </script>
</asp:Content>
