@extends('layouts.master')

@section('content')
<!-- Navigation -->
<nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
    @include('includes.navbar-header')

    @include('includes.navbar-top-links')

    @include('includes.sidebar')
</nav>

<!-- Page Content -->
<div id="page-wrapper">
    <div ui-view></div>
</div>
<!-- /#page-wrapper -->
@endsection
