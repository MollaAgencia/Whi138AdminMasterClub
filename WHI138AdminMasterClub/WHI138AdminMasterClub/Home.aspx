<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="WHI138AdminMasterClub.Home" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="conteudo" runat="server">
    <div class="row tile_count ">
        <div class="top_tiles">
            <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div class="tile-stats">
                    <div class="icon"><i class="fa fa-bank blue"></i></div>
                    <div class="count blue">2000</div>
                    <h3>Pré Cadastrados</h3>
                    <br />
                </div>
            </div>
            <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div class="tile-stats">
                    <div class="icon"><i class="fa fa-users green"></i></div>
                    <div class="count green">1000</div>
                    <h3>Cadastrados</h3>
                    <span class="count_bottom right"><i class="blue">&nbsp 50%&nbsp  </i></span>
                    <br />
                    
                </div>
            </div>
            <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div class="tile-stats">
                    <div class="icon"><i class="fa fa-pencil red"></i></div>
                    <div class="count red">800</div>
                    <h3>Quiz</h3>
                    <span class="count_bottom right"><i class="blue">&nbsp 80%&nbsp  </i></span>
                    <br />
                </div>
            </div>
            <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div class="tile-stats">
                    <div class="icon"><i class="fa fa-video-camera purple"></i></div>
                    <div class="count purple">500</div>
                    <h3>Video</h3>
                    <span class="count_bottom right"><i class="blue">&nbsp 50%&nbsp  </i></span>
                    <br />
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
